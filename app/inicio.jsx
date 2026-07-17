import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./inicioStyles";

export default function Inicio() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://img.freepik.com/vetores-gratis/vetor-de-design-de-gradiente-colorido-de-passaro_343694-2506.jpg?semt=ais_hybrid&w=740&q=80",
          }}
          style={styles.heroImage}
        />
        <Text style={styles.title}>Bem-vindo ao Raggio Studio</Text>
        <Text style={styles.subtitle}>
          Agora que seus dados foram confirmados, veja o seu plano inicial e
          comece o acompanhamento.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/homeScreen")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Ir para o início</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
