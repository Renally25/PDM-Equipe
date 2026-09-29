import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function Config7() {
  const { codusuario } = useLocalSearchParams();

  const [objetivos, setObjetivos] = useState("");
  const [expectativas, setExpectativas] = useState("");
  const [oQueMotivou, setOQueMotivou] = useState("");
  const [comprometimento, setComprometimento] = useState("");

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const canContinue =
    objetivos.trim().length > 0 &&
    expectativas.trim().length > 0 &&
    oQueMotivou.trim().length > 0 &&
    comprometimento.trim().length > 0;

  async function handleContinuar() {
    if (!codigoUsuario) {
      Alert.alert("Erro", "Não foi possível identificar o usuário.");
      return;
    }

    if (!canContinue) {
      Alert.alert(
        "Faltam dados",
        "Preencha todas as informações para continuar."
      );
      return;
    }

    try {
      const chave = `anamnese_${codigoUsuario}`;

      const dadosExistentes = await AsyncStorage.getItem(chave);

      const anamneseExistente = dadosExistentes
        ? JSON.parse(dadosExistentes)
        : {};

      const dados = {
        codusuario: Number(codigoUsuario),
        objetivo: objetivos.trim(),
        expectativa: expectativas.trim(),
        o_que_motivou: oQueMotivou.trim(),
        comprometimento: comprometimento.trim(),
      };

      const anamneseAtualizada = {
        ...anamneseExistente,
        ...dados,
      };

      await AsyncStorage.setItem(
        chave,
        JSON.stringify(anamneseAtualizada)
      );

      router.push({
        pathname: "./configTermo",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível salvar os dados."
      );
    }
  }

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
                value={objetivos}
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
                style={styles.opcaoInput}
                placeholder="Quais são suas expectativas?"
                value={expectativas}
                onChangeText={setExpectativas}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              O que motivou você a começar?
            </Text>

            <View style={styles.opcaoInputContainer}>
              <TextInput
                style={styles.opcaoInput}
                placeholder="O que motivou você?"
                value={oQueMotivou}
                onChangeText={setOQueMotivou}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Qual é o seu nível de comprometimento?
            </Text>

            <View style={styles.opcaoInputContainer}>
              <TextInput
                style={styles.opcaoInput}
                placeholder="Informe seu nível de comprometimento"
                value={comprometimento}
                onChangeText={setComprometimento}
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
          disabled={!canContinue}
          onPress={handleContinuar}
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