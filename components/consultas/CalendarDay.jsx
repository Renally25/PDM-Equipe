import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../app/consultasStyles";

export default function CalendarDay({
  day,
  currentMonth,
  selected,
  today,
  events,
  onPress,
}) {
  const isCurrentMonth =
    day.getMonth() === currentMonth.getMonth() &&
    day.getFullYear() === currentMonth.getFullYear();

  return (
    <TouchableOpacity
      accessibilityLabel={`Dia ${day.getDate()}`}
      style={[styles.dayCell, selected && styles.selectedDay]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.dayNumber,
          !isCurrentMonth && styles.otherMonthText,
          today && styles.todayText,
        ]}
      >
        {day.getDate()}
      </Text>
      {today && <View style={styles.todayMark} />}
      {events.length > 0 && <View style={styles.eventDot} />}
    </TouchableOpacity>
  );
}
