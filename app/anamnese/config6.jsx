import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./configPerfilStyles";

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API ||
  process.env.NEXT_PUBLIC_AUTH_API;

export default function Config6() {
  const { codusuario } = useLocalSearchParams();

  const [objetivos, setObjetivos] = useState("");
  const [expectativas, setExpectativas] = useState("");

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const canContinue =
    objetivos.trim().length > 0 &&
    expectativas.trim().length > 0;

  const handleContinuar = () => {
    if (!canContinue) {
      Alert.alert(
        "Faltam dados",
        "Preencha os objetivos e as expectativas para continuar."
      );
      return;
    }

    if (!codigoUsuario) {
      Alert.alert(
        "Erro",
        "Código do usuário não encontrado. Volte ao início do cadastro."
      );
      return;
    }

    router.push({
      pathname: "./configTermo",
      params: {
        codusuario: String(codigoUsuario),
        objetivos: objetivos.trim(),
        expectativas: expectativas.trim(),
      },
    });
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
          <View style={styles.etapasVazio} />
        </View>

        <Text style={styles.titulo}>
          Objetivos e expectativas
        </Text>

        <View style={styles.formGrid}>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Objetivos com a musculação
            </Text>

            <View style={styles.opcaoInputContainer}>
              <TextInput
                style={styles.opcaoInput}
                placeholder="Quais são seus objetivos?"
                value={objetivos ?? ""}
                onChangeText={setObjetivos}
              />
            </View>
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Expectativas com a musculação
            </Text>

            <View style={styles.opcaoInputContainer}>
              <TextInput
                style={[
                  styles.opcaoInput,
                  styles.opcaoInputMultiline,
                ]}
                placeholder="Quais são suas expectativas com a musculação?"
                value={expectativas ?? ""}
                onChangeText={setExpectativas}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.decisions}>
        <TouchableOpacity
          style={[
            styles.buttonContinuar,
            !canContinue && styles.buttonDisabled,
          ]}
          onPress={handleContinuar}
          disabled={!canContinue}
        >
          <Text style={styles.decisionsContinuar}>
            Continuar
          </Text>

          <AntDesign
            name="arrow-right"
            size={20}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => router.back()}
        >
          <AntDesign
            name="arrow-left"
            size={20}
            color="#3B4231"
          />

          <Text style={styles.decisionsVoltar}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}