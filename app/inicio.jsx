import { router, useLocalSearchParams } from "expo-router";

import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./inicioStyles";

export default function Inicio() {
  const { codusuario } = useLocalSearchParams();

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/Logo Raggio.png")}
          style={styles.heroImage}
        />

        <Text style={styles.title}>
          Bem-vindo ao Raggio Studio
        </Text>

        <Text style={styles.subtitle}>
          Agora que seus dados foram confirmados, veja o seu plano inicial e
          comece o acompanhamento.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/homeScreen",
              params: {
                codusuario: String(codigoUsuario),
              },
            })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Ir para o início
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}