import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import styles from "./configPerfilStyles";

export default function Config2() {
  const { codusuario } = useLocalSearchParams();

  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [disponibilidade, setDisponibilidade] = useState(null);
  const [nivelAtividade, setNivelAtividade] = useState(null);
  const [musculacao, setMusculacao] = useState(null);
  const [tempoMusculacao, setTempoMusculacao] = useState("");

  const codigoUsuario = Array.isArray(codusuario) ? codusuario[0] : codusuario;

  const canContinue =
    peso.trim() !== "" &&
    altura.trim() !== "" &&
    disponibilidade !== null &&
    nivelAtividade !== null &&
    musculacao !== null &&
    (musculacao === "Não" || tempoMusculacao.trim() !== "");

  async function handleContinuar() {
    if (!codigoUsuario) {
      Alert.alert("Erro", "Não foi possível identificar o usuário.");
      return;
    }

    if (!canContinue) {
      Alert.alert("Atenção", "Preencha todos os campos antes de continuar.");
      return;
    }

    const pesoNumerico = Number(peso.replace(",", "."));

    const alturaNumerica = Number(altura.replace(",", "."));

    if (Number.isNaN(pesoNumerico) || Number.isNaN(alturaNumerica)) {
      Alert.alert("Atenção", "Informe valores válidos para peso e altura.");
      return;
    }

    if (pesoNumerico >= 1000 || alturaNumerica >= 1000) {
      Alert.alert("Atenção", "Informe valores válidos para peso e altura.");
      return;
    }

    const dados = {
      codusuario: Number(codigoUsuario),

      peso: pesoNumerico,
      altura: alturaNumerica,

      atividade: nivelAtividade,

      musculacao_antes: musculacao === "Sim",

      tempo_treino: musculacao === "Sim" ? tempoMusculacao.trim() : null,

      fisicamente_ativo: nivelAtividade !== "Sedentario",

      frequencia: disponibilidade,
    };

    try {
      const chave = `anamnese_${codigoUsuario}`;

      const dadosExistentes = await AsyncStorage.getItem(chave);

      const anamneseExistente = dadosExistentes
        ? JSON.parse(dadosExistentes)
        : {};

      const anamneseAtualizada = {
        ...anamneseExistente,
        ...dados,
      };

      await AsyncStorage.setItem(chave, JSON.stringify(anamneseAtualizada));

      router.push({
        pathname: "./config3",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (error) {
      console.error("Erro ao salvar dados físicos:", error);

      Alert.alert("Erro", "Não foi possível salvar os dados físicos.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.etapasProcesso}>
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
        </View>

        <Text style={styles.titulo}>Dados físicos</Text>

        <View style={styles.inputContainers}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputFisico}>Peso (kg)</Text>

            <TextInput
              style={styles.opcaoInput}
              value={peso}
              onChangeText={setPeso}
              placeholder="Ex: 70"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputFisico}>Altura (cm)</Text>

            <TextInput
              style={styles.opcaoInput}
              value={altura}
              onChangeText={setAltura}
              placeholder="Ex: 175"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.containersSelecao}>
          <Text style={styles.inputFisico}>
            Nível de atividade física atual
          </Text>

          <View style={styles.containerSelecao}>
            {["Sedentario", "Leve", "Moderado", "Intenso"].map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.opcaoSelecao,
                  nivelAtividade === opcao && styles.opcaoSelecionada,
                ]}
                onPress={() => setNivelAtividade(opcao)}
              >
                <Text style={styles.textoSelecao}>{opcao}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.containersSelecao}>
          <Text style={styles.inputFisico}>Disponibilidade de treino</Text>

          <View style={styles.containerSelecao}>
            {["2x semana", "3x semana", "4x semana", "5x semana"].map(
              (opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={[
                    styles.opcaoSelecao,
                    disponibilidade === opcao && styles.opcaoSelecionada,
                  ]}
                  onPress={() => setDisponibilidade(opcao)}
                >
                  <Text style={styles.textoSelecao}>{opcao}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        <View style={styles.containersSelecao}>
          <Text style={styles.inputFisico}>Já praticou musculação antes?</Text>

          <View style={styles.containerSelecao}>
            {["Sim", "Não"].map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.opcaoSelecao,
                  musculacao === opcao && styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setMusculacao(opcao);

                  if (opcao === "Não") {
                    setTempoMusculacao("");
                  }
                }}
              >
                <Text style={styles.textoSelecao}>{opcao}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {musculacao === "Sim" && (
            <View style={styles.opcaoInputContainer}>
              <TextInput
                style={styles.opcaoInput}
                value={tempoMusculacao}
                onChangeText={setTempoMusculacao}
                placeholder="Há quanto tempo? Ex: 2 anos"
              />
            </View>
          )}
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
          <Text style={styles.decisionsContinuar}>Continuar</Text>

          <AntDesign name="arrow-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => router.back()}
        >
          <AntDesign name="arrow-left" size={20} color="#3B4231" />

          <Text style={styles.decisionsVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
