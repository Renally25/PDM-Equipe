import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../app/consultasStyles";
import {
    eventTime,
    eventTitle,
    formatAppointment,
} from "../../utils/consultasUtils";

export function AppointmentCard({ appointment }) {
  return (
    <View style={styles.cartaoConsulta}>
      <Text style={styles.rotuloConsulta}>Próxima consulta</Text>
      <Text style={styles.valorConsulta}>
        {appointment
          ? formatAppointment(appointment.event, appointment.date)
          : "Nenhuma consulta agendada"}
      </Text>
    </View>
  );
}

export function EventCard({ event }) {
  const time = eventTime(event);
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventIcon}>
        <Ionicons
          name="calendar-outline"
          size={22}
          color={styles.colors.darkGreen}
        />
      </View>
      <View>
        <Text style={styles.eventTitle}>{eventTitle(event)}</Text>
        {time && <Text style={styles.eventTime}>{time}</Text>}
      </View>
    </View>
  );
}

export function SelectionButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.selectionButton,
        selected && styles.selectionButtonSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.selectionButtonText,
          selected && styles.selectionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
