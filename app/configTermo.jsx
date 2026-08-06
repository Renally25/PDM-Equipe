import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./configPerfilStyles";

export default function ConfigTermo() {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!isConfirmed) {
      Alert.alert(
        "Confirmação necessária",
        "Marque a autorização para continuar.",
      );
      return;
    }

    router.push("/inicio");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.etapasProcesso}>
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasPreenchido} />
        </View>
        <Text style={styles.titulo}>Confirme suas informações</Text>
        <View style={styles.containersSelecao}>
          <Text style={styles.textoSelecao}>
            Declaro que autorizo o uso dos meus dados pessoais, conforme a Lei
            Geral de Proteção de dados (Lei nº 13.709/2018) para fins de
            atendimento e acompanhamento no Raggio Studio ClinFit.
          </Text>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsConfirmed(!isConfirmed)}
          >
            <View
              style={[styles.checkbox, isConfirmed && styles.checkboxChecked]}
            >
              {isConfirmed && (
                <AntDesign name="check" size={16} color="white" />
              )}
            </View>
            <Text style={styles.captchaText}>
              {isConfirmed
                ? "Confirmado"
                : "Concordo e autorizo o uso dos meus dados pessoais"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.decisions}>
        <TouchableOpacity
          style={[
            styles.buttonContinuar,
            !isConfirmed && styles.buttonDisabled,
          ]}
          disabled={!isConfirmed}
          onPress={handleConfirm}
        >
          <Text style={styles.decisionsContinuar}>Enviar e continuar</Text>
          <AntDesign name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => router.back()}
        >
          <AntDesign name="arrow-left" size={20} color="#3B4231" />
          <Text style={styles.decisionsVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
