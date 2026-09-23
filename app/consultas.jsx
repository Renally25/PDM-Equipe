import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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
import { obterSessao } from "../utils/session";
import styles from "./consultasStyles";

const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const professionals = [
  {
    codusuario: 101,
    nome: "Treinador físico",
    tipo: "treinador",
  },
  {
    codusuario: 102,
    nome: "Psicólogo",
    tipo: "psicologo",
  },
  {
    codusuario: 103,
    nome: "Fisioterapeuta",
    tipo: "fisioterapeuta",
  },
];

const availableTimes = [
  "08:00",
  "10:00",
  "14:00",
  "16:00",
  "18:00",
];

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API ||
  process.env.NEXT_PUBLIC_AUTH_API;

export function Calendario() {
  const { codusuario } = useLocalSearchParams();
  const sessao = obterSessao();

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario || sessao?.usuario?.codusuario;

  const hoje = new Date();

  const [selectedDate, setSelectedDate] = useState(hoje);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      1
    )
  );

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [professional, setProfessional] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmationVisible, setConfirmationVisible] =
    useState(false);
  const [saving, setSaving] = useState(false);

  const days = useMemo(
    () =>
      buildMonthGrid(
        currentMonth.getFullYear(),
        currentMonth.getMonth()
      ),
    [currentMonth]
  );

  const eventsByDate = useMemo(() => {
    return events.reduce((index, event) => {
      const key = eventDate(event);

      if (key) {
        index[key] = [
          ...(index[key] || []),
          event,
        ];
      }

      return index;
    }, {});
  }, [events]);

  const selectedEvents =
    eventsByDate[dateKey(selectedDate)] || [];

  const nextAppointment = useMemo(() => {
    const now = new Date();

    return events
      .map((event) => ({
        event,
        date: eventDateTime(event),
      }))
      .filter(
        ({ date }) =>
          date && date >= now
      )
      .sort(
        (first, second) =>
          first.date - second.date
      )[0];
  }, [events]);

  useEffect(() => {
    async function carregarConsultas() {
      console.log("CODUSUARIO DA ROTA:", codusuario);
      console.log(
        "CODUSUARIO DA SESSÃO:",
        sessao?.usuario?.codusuario
      );
      console.log("CODUSUARIO EM CONSULTAS:", codigoUsuario);

      if (!apiUrl) {
        console.log("API URL NÃO EXISTE");
        setError(
          "Configure EXPO_PUBLIC_AUTH_API para carregar as consultas."
        );
        setLoading(false);
        return;
      }

      if (!codigoUsuario) {
        console.log("CODUSUARIO NÃO EXISTE EM CONSULTAS");
        setError("Usuário não identificado.");
        setLoading(false);
        return;
      }

      try {
        const url = `${apiUrl}/api/Consulta?codusuario=${codigoUsuario}`;

        console.log("FAZENDO FETCH DE CONSULTAS:", url);

        const result = await fetch(
          url
        );

        console.log("STATUS DA API DE CONSULTAS:", result.status);

        const data = await result.json();

        console.log("CONSULTAS RECEBIDAS:", data);

        if (!result.ok) {
          throw new Error(
            "Erro ao buscar consultas"
          );
        }

        setEvents(
          Array.isArray(data)
            ? data
            : data.consultas || []
        );
      } catch (requestError) {
        console.error("ERRO AO BUSCAR CONSULTAS:", requestError);
        setError(
          "Não foi possível carregar as consultas."
        );
      } finally {
        setLoading(false);
      }
    }

    carregarConsultas();
  }, [codigoUsuario, codusuario, sessao?.usuario?.codusuario]);

  function changeMonth(amount) {
    setCurrentMonth(
      (month) =>
        new Date(
          month.getFullYear(),
          month.getMonth() + amount,
          1
        )
    );
  }

  function selectDate(day) {
    const dataAtual = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );

    if (day < dataAtual) {
      return;
    }

    setSelectedDate(day);
  }

  async function confirmAppointment() {
    if (
      !codigoUsuario ||
      !professional ||
      !selectedTime ||
      saving
    ) {
      return;
    }

    setSaving(true);

    let codtreinador = null;
    let codpsicologo = null;
    let codfisioterapeuta = null;

    if (professional.tipo === "treinador") {
      codtreinador = professional.codusuario;
    }

    if (professional.tipo === "psicologo") {
      codpsicologo = professional.codusuario;
    }

    if (
      professional.tipo === "fisioterapeuta"
    ) {
      codfisioterapeuta =
        professional.codusuario;
    }

    console.log("CODUSUARIO AO AGENDAR CONSULTA:", codigoUsuario);
    console.log("DADOS DA CONSULTA:", {
      codusuario: Number(codigoUsuario),
      dataconsulta: dateKey(selectedDate),
      horaconsulta: selectedTime,
      codtreinador,
      codpsicologo,
      codfisioterapeuta,
    });

    try {
      const resposta = await fetch(
        `${apiUrl}/api/Consulta`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codusuario: Number(codigoUsuario),
            dataconsulta:
              dateKey(selectedDate),
            horaconsulta: selectedTime,
            status: "agendada",
            observacoes: null,
            codtreinador,
            codpsicologo,
            codfisioterapeuta,
          }),
        }
      );

      const dados = await resposta.json();

      console.log("STATUS AO AGENDAR CONSULTA:", resposta.status);
      console.log("RESPOSTA AO AGENDAR CONSULTA:", dados);

      if (!resposta.ok) {
        console.error(
          "Erro ao marcar consulta:",
          dados
        );
        return;
      }

      const novaConsulta =
        dados.consulta || dados;

      setEvents((currentEvents) => [
        ...currentEvents,
        novaConsulta,
      ]);

      setConfirmationVisible(false);
      setProfessional(null);
      setSelectedTime("");
    } catch (requestError) {
      console.error("ERRO NO FETCH DE AGENDAMENTO:", requestError);
      console.error(
        "Erro ao marcar consulta:",
        requestError
      );
    } finally {
      setSaving(false);
    }
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

            <Text style={styles.title}>
              Consultas
            </Text>
          </View>

          <AppointmentCard
            appointment={nextAppointment}
          />

          <MonthHeader
            month={currentMonth}
            onChange={changeMonth}
          />

          <View style={styles.calendar}>
            {weekDays.map((day) => (
              <Text
                key={day}
                style={styles.weekDay}
              >
                {day}
              </Text>
            ))}

            {days.map((day) => (
              <CalendarDay
                key={day.toISOString()}
                day={day}
                currentMonth={currentMonth}
                selected={
                  dateKey(day) ===
                  dateKey(selectedDate)
                }
                today={
                  dateKey(day) ===
                  dateKey(hoje)
                }
                events={
                  eventsByDate[
                    dateKey(day)
                  ] || []
                }
                onPress={() =>
                  selectDate(day)
                }
              />
            ))}
          </View>

          <Text style={styles.selectedDate}>
            {selectedDate.toLocaleDateString(
              "pt-BR",
              {
                day: "numeric",
                month: "long",
              }
            )}
          </Text>

          <Text style={styles.sectionTitle}>
            Agendar consulta
          </Text>

          <Text style={styles.fieldLabel}>
            Profissional
          </Text>

          <View style={styles.selectionRow}>
            {professionals.map((item) => (
              <SelectionButton
                key={item.codusuario}
                label={item.nome}
                selected={
                  professional?.codusuario ===
                  item.codusuario
                }
                onPress={() =>
                  setProfessional(item)
                }
              />
            ))}
          </View>

          <Text style={styles.fieldLabel}>
            Horário
          </Text>

          <View style={styles.selectionRow}>
            {availableTimes.map((time) => (
              <SelectionButton
                key={time}
                label={time}
                selected={
                  selectedTime === time
                }
                onPress={() =>
                  setSelectedTime(time)
                }
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.scheduleButton,
              (!professional ||
                !selectedTime) &&
                styles.scheduleButtonDisabled,
            ]}
            disabled={
              !professional ||
              !selectedTime ||
              saving
            }
            onPress={() =>
              setConfirmationVisible(true)
            }
            activeOpacity={0.8}
          >
            <Text
              style={
                styles.scheduleButtonText
              }
            >
              Revisar e confirmar
            </Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator
              color={
                styles.colors.darkGreen
              }
            />
          )}

          {!loading && error ? (
            <Text style={styles.message}>
              {error}
            </Text>
          ) : null}

          {!loading &&
          !error &&
          selectedEvents.length === 0 ? (
            <Text style={styles.message}>
              Nenhuma consulta neste dia.
            </Text>
          ) : null}

          {selectedEvents.map(
            (event, index) => (
              <EventCard
                key={`${eventDate(
                  event
                )}-${index}`}
                event={event}
              />
            )
          )}
        </ScrollView>

        <Modal
          visible={confirmationVisible}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setConfirmationVisible(false)
          }
        >
          <View
            style={styles.modalOverlay}
          >
            <View
              style={
                styles.confirmationModal
              }
            >
              <Text
                style={styles.modalTitle}
              >
                Confirmar consulta
              </Text>

              <Text
                style={styles.modalText}
              >
                {professional?.nome}
              </Text>

              <Text
                style={styles.modalText}
              >
                {selectedDate.toLocaleDateString(
                  "pt-BR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}{" "}
                às {selectedTime}
              </Text>

              <View
                style={styles.modalActions}
              >
                <TouchableOpacity
                  onPress={() =>
                    setConfirmationVisible(
                      false
                    )
                  }
                  style={
                    styles.cancelButton
                  }
                  disabled={saving}
                >
                  <Text
                    style={
                      styles.cancelButtonText
                    }
                  >
                    Voltar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={
                    confirmAppointment
                  }
                  style={
                    styles.confirmButton
                  }
                  disabled={saving}
                >
                  <Text
                    style={
                      styles.confirmButtonText
                    }
                  >
                    {saving
                      ? "Salvando..."
                      : "Confirmar"}
                  </Text>
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