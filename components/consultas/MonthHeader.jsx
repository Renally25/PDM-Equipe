import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../app/consultasStyles";

export default function MonthHeader({ month, onChange }) {
  return (
    <View style={styles.monthHeader}>
      <TouchableOpacity
        onPress={() => onChange(-1)}
        accessibilityLabel="Mês anterior"
      >
        <Ionicons
          name="chevron-back"
          size={22}
          color={styles.colors.textDark}
        />
      </TouchableOpacity>
      <Text style={styles.monthTitle}>
        {month.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
      </Text>
      <TouchableOpacity
        onPress={() => onChange(1)}
        accessibilityLabel="Próximo mês"
      >
        <Ionicons
          name="chevron-forward"
          size={22}
          color={styles.colors.textDark}
        />
      </TouchableOpacity>
    </View>
  );
}
