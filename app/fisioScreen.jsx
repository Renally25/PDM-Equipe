import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { colors, styles } from "./fisioStyles";

const tituloTela = "Fisioterapia";

const diasTreino = [
  //informações substituíveis
  {
    key: "seg",
    day: "Seg",
    group: "Mobilidade de Ombro",
    exercises: ["3 séries - 12 repetições"],
  },
  {
    key: "ter",
    day: "Ter",
    group: "Fortalecimento lombar",
    exercises: ["2 séries - 3 repetições"],
  },
  {
    key: "qua",
    day: "Qua",
    group: "Alongamento cadeia posterior",
    exercises: ["20 min - guiado"],
  },
  {
    key: "qui",
    day: "Qui",
    group: "Amplitude de movimento",
    exercises: ["3 séries - 15 repetições"],
  },
  {
    key: "sex",
    day: "Sex",
    group: "Treinamento aeróbio",
    exercises: ["Bicicleta ergométrica - 15 min"],
  },
];

export default function fisioScreen() {
  return (
    <View style={styles.frame}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/homeScreen")}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color={colors.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{tituloTela}</Text>
          </View>

          {/* Lista de dias*/}
          {diasTreino.map((item) => (
            <View key={item.key} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                  {item.day} - {item.group}
                </Text>
              </View>

              <View style={styles.expandedPanel}>
                <View style={styles.listaExercicios}>
                  {item.exercises.map((exercicio, idx) => (
                    <Text
                      key={exercicio}
                      style={
                        idx === 0
                          ? styles.exercicioDestaque
                          : styles.textoExercicio
                      }
                    >
                      {exercicio}
                    </Text>
                  ))}
                </View>
                <View style={styles.scrollbarTrack}>
                  <View style={styles.scrollbarThumb} />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.observacaoContainer}>
            <Text style={styles.observacaoLabel}>Observação</Text>
            <Text style={styles.observacaoText}>
              Observação do fisioterapeuta será exibida aqui quando disponível.
            </Text>
          </View>
        </ScrollView>

        {/* Barra de navegação inferior */}
        <View style={styles.barraNavegacaoInferior}>
          <TouchableOpacity style={styles.navIconWrapper}>
            <Ionicons
              name="home-outline"
              size={26}
              color={colors.white}
              onPress={() => router.push("/homeScreen")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconWrapper}>
            <Ionicons
              name="person-outline"
              size={26}
              color={colors.white}
              onPress={() => router.push("/PerfilScreen")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
