import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, styles } from "./treinosStyles";

const tituloTela = "Meus Treinos";

const diasTreino = [
  //informações substituíveis
  {
    key: "seg",
    day: "Seg",
    group: "Membros Inferiores",
    exercises: [
      "Agachamento livre, 4 x 15",
      "Leg press 45°, 4 x 15",
      "Cadeira extensora, 4 x 15",
      "Gêmeos sentado, 4 x 15",
    ],
  },
  {
    key: "ter",
    day: "Ter",
    group: "Membros Superiores",
    exercises: [
      "Supino reto, 4 x 12",
      "Puxada frente, 4 x 12",
      "Desenvolvimento, 4 x 12",
      "Rosca direta, 3 x 15",
    ],
  },
  {
    key: "qua",
    day: "Qua",
    group: "Membros Inferiores",
    exercises: [
      "Cadeira flexora, 4 x 15",
      "Stiff, 4 x 12",
      "Panturrilha em pé, 4 x 20",
      "Abdução de quadril, 3 x 15",
    ],
  },
  {
    key: "qui",
    day: "Qui",
    group: "Membros Superiores",
    exercises: [
      "Remada baixa, 4 x 12",
      "Elevação lateral, 3 x 15",
      "Tríceps corda, 4 x 12",
      "Rosca alternada, 3 x 15",
    ],
  },
  {
    key: "sex",
    day: "Sex",
    group: "Membros...",
    exercises: [
      "Levantamento terra, 4 x 10",
      "Afundo, 3 x 12",
      "Panturrilha sentado, 4 x 20",
      "Prancha, 3 x 40s",
    ],
  },
];

export default function TreinosScreen() {
  const [chaveAberta, setChaveAberta] = useState(null);
  const onBack = () => router.back();

  const alternarExpansao = (key) => {
    setChaveAberta((prev) => (prev === key ? null : key));
  };

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
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color={colors.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{tituloTela}</Text>
          </View>

          {/* Lista de dias (accordion) */}
          {diasTreino.map((item) => {
            const estaExpandido = chaveAberta === item.key;
            return (
              <View key={item.key} style={styles.card}>
                <TouchableOpacity
                  style={styles.cardHeader}
                  activeOpacity={0.7}
                  onPress={() => alternarExpansao(item.key)}
                >
                  <Text style={styles.cardTitle}>
                    {item.day} - {item.group}
                  </Text>
                  {!estaExpandido && (
                    <Ionicons
                      name="chevron-down"
                      size={18}
                      color={colors.textDark}
                    />
                  )}
                </TouchableOpacity>

                {estaExpandido ? (
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
                ) : (
                  <TouchableOpacity
                    style={styles.barraColapsada}
                    activeOpacity={0.7}
                    onPress={() => alternarExpansao(item.key)}
                  >
                    <Ionicons
                      name="chevron-up"
                      size={16}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
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
              onPress={() => router.push("/profileScreen")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
