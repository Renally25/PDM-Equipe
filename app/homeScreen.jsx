import { Ionicons } from "@expo/vector-icons";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { router } from "expo-router";
import { colors, styles } from "./homeScreenStyles";

const user = {
  firstGreeting: "Olá,",
  name: "Gabriela Xavier",
  initials: "GX",
};

const nextAppointment = {
  label: "Próxima consulta",
  value: "Psicóloga - hoje, 15h",
};

const shortcuts = [
  { key: "treinosScreen", label: "Treinos", icon: "barbell-outline" },
  { key: "diarios", label: "Diários", icon: "pencil-outline" },
  { key: "consultas", label: "Consultas", icon: "calendar-outline" },
  { key: "fisioScreen", label: "Fisioterapia", icon: "location-outline" },
];

export default function HomeScreen() {
  return (
    <View style={styles.quadro}>
      <SafeAreaView style={styles.areaSegura}>
        <ScrollView
          style={styles.visualizacaoRolagem}
          contentContainerStyle={styles.conteudoRolagem}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.linhaCabecalho}>
            <View>
              <Text style={styles.saudacao}>{user.firstGreeting}</Text>
              <Text style={styles.nomeUsuario}>{user.name}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.textoAvatar}>{user.initials}</Text>
            </View>
          </View>

          <View style={styles.cartaoConsulta}>
            <Text style={styles.rotuloConsulta}>{nextAppointment.label}</Text>
            <Text style={styles.valorConsulta}>{nextAppointment.value}</Text>
          </View>

          <View style={styles.grade}>
            {shortcuts.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.itemGrade}
                activeOpacity={0.7}
              >
                <View style={styles.caixaIconeGrade}>
                  <Ionicons name={item.icon} size={28} color={colors.white} onPress={() => router.push(`/${item.key}`)}/>
                  
                </View>
                <Text style={styles.rotuloGrade}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.barraNavegacaoInferior}>
          <TouchableOpacity style={styles.wrapperIconeNavegacao}>
            <Ionicons name="home-outline" size={26} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapperIconeNavegacao}
            onPress={() => router.push("/PerfilScreen")}
          >
            <Ionicons name="person-outline" size={26} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
