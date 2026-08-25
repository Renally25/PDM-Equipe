import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    AppointmentCard,
    EventCard,
    SelectionButton,
} from "../components/consultas/AppointmentComponents";
import CalendarDay from "../components/consultas/CalendarDay";
import MonthHeader from "../components/consultas/MonthHeader";
import {
    buildMonthGrid,
    dateKey,
    eventDate,
    eventDateTime,
} from "../utils/consultasUtils";
import styles from "./consultasStyles";

const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const professionals = ["Treinador físico", "Fisioterapeuta", "Psicólogo"];
const availableTimes = ["08:00", "10:00", "14:00", "16:00", "18:00"];
const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API || process.env.NEXT_PUBLIC_AUTH_API;

export function Calendario() {
  const hoje = new Date();
  const [selectedDate, setSelectedDate] = useState(hoje);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(hoje.getFullYear(), hoje.getMonth(), 1),
  );
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [professional, setProfessional] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const days = useMemo(
    () => buildMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth],
  );

  const eventsByDate = useMemo(() => {
    return events.reduce((index, event) => {
      const key = eventDate(event);
      if (key) index[key] = [...(index[key] || []), event];
      return index;
    }, {});
  }, [events]);

  const selectedEvents = eventsByDate[dateKey(selectedDate)] || [];
  const nextAppointment = useMemo(() => {
    const now = new Date();
    return events
      .map((event) => ({ event, date: eventDateTime(event) }))
      .filter(({ date }) => date && date >= now)
      .sort((first, second) => first.date - second.date)[0];
  }, [events]);

  useEffect(() => {
    async function carregarConsultas() {
      if (!apiUrl) {
        setError("Configure EXPO_PUBLIC_AUTH_API para carregar as consultas.");
        setLoading(false);
        return;
      }
      try {
        const result = await fetch(`${apiUrl}/api/Consulta`);
        if (!result.ok) throw new Error("Erro ao buscar consultas");
        const data = await result.json();
        setEvents(Array.isArray(data) ? data : data.consultas || []);
      } catch (requestError) {
        console.error(requestError);
        setError("Não foi possível carregar as consultas.");
      } finally {
        setLoading(false);
      }
    }
    carregarConsultas();
  }, []);

  function changeMonth(amount) {
    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + amount, 1),
    );
  }

  function selectDate(day) {
    if (day < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()))
      return;
    setSelectedDate(day);
  }

  function confirmAppointment() {
    setEvents((currentEvents) => [
      ...currentEvents,
      { date: dateKey(selectedDate), time: selectedTime, title: professional },
    ]);
    setConfirmationVisible(false);
    setProfessional("");
    setSelectedTime("");
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              accessibilityLabel="Voltar"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={styles.colors.textDark}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Consultas</Text>
          </View>
          <AppointmentCard appointment={nextAppointment} />
          <MonthHeader month={currentMonth} onChange={changeMonth} />
          <View style={styles.calendar}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDay}>
                {day}
              </Text>
            ))}
            {days.map((day) => (
              <CalendarDay
                key={day.toISOString()}
                day={day}
                currentMonth={currentMonth}
                selected={dateKey(day) === dateKey(selectedDate)}
                today={dateKey(day) === dateKey(hoje)}
                events={eventsByDate[dateKey(day)] || []}
                onPress={() => selectDate(day)}
              />
            ))}
          </View>
          <Text style={styles.selectedDate}>
            {selectedDate.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
            })}
          </Text>
          <Text style={styles.sectionTitle}>Agendar consulta</Text>
          <Text style={styles.fieldLabel}>Profissional</Text>
          <View style={styles.selectionRow}>
            {professionals.map((item) => (
              <SelectionButton
                key={item}
                label={item}
                selected={professional === item}
                onPress={() => setProfessional(item)}
              />
            ))}
          </View>
          <Text style={styles.fieldLabel}>Horário</Text>
          <View style={styles.selectionRow}>
            {availableTimes.map((time) => (
              <SelectionButton
                key={time}
                label={time}
                selected={selectedTime === time}
                onPress={() => setSelectedTime(time)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.scheduleButton,
              (!professional || !selectedTime) && styles.scheduleButtonDisabled,
            ]}
            disabled={!professional || !selectedTime}
            onPress={() => setConfirmationVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.scheduleButtonText}>Revisar e confirmar</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator color={styles.colors.darkGreen} />}
          {!loading && error ? (
            <Text style={styles.message}>{error}</Text>
          ) : null}
          {!loading && !error && selectedEvents.length === 0 ? (
            <Text style={styles.message}>Nenhuma consulta neste dia.</Text>
          ) : null}
          {selectedEvents.map((event, index) => (
            <EventCard key={`${eventDate(event)}-${index}`} event={event} />
          ))}
        </ScrollView>
        <Modal
          visible={confirmationVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setConfirmationVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.confirmationModal}>
              <Text style={styles.modalTitle}>Confirmar consulta</Text>
              <Text style={styles.modalText}>{professional}</Text>
              <Text style={styles.modalText}>
                {selectedDate.toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                às {selectedTime}
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => setConfirmationVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmAppointment}
                  style={styles.confirmButton}
                >
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

export default Calendario;
