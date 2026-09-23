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

export default function Config4() {
  const { codusuario } = useLocalSearchParams();

  const [dificuldadesEmocionais, setDificuldadesEmocionais] =
    useState(null);

  const [
    dificuldadesEmocionaisDetalhes,
    setDificuldadesEmocionaisDetalhes,
  ] = useState("");

  const [acompanhamentoPsico, setAcompanhamentoPsico] =
    useState(null);

  const [tempoAcompanhamento, setTempoAcompanhamento] =
    useState("");

  const [possuiDisturbio, setPossuiDisturbio] =
    useState(null);

  const [qualDisturbio, setQualDisturbio] =
    useState("");

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const canContinue = Boolean(
    dificuldadesEmocionais &&
      acompanhamentoPsico &&
      possuiDisturbio &&
      (dificuldadesEmocionais === "Não" ||
        dificuldadesEmocionaisDetalhes.trim()) &&
      (acompanhamentoPsico === "Não" ||
        tempoAcompanhamento.trim()) &&
      (possuiDisturbio === "Não" ||
        qualDisturbio.trim())
  );

  async function handleContinuar() {
    if (!codigoUsuario) {
      Alert.alert(
        "Erro",
        "Não foi possível identificar o usuário."
      );
      return;
    }

    if (!canContinue) {
      Alert.alert(
        "Faltam dados",
        "Responda todas as perguntas obrigatórias antes de continuar."
      );
      return;
    }

    const dados = {
      codusuario: Number(codigoUsuario),
      etapa: "psicologica",

      tem_dificul_emocional:
        dificuldadesEmocionais === "Sim",

      dificul_emocional:
        dificuldadesEmocionais === "Sim"
          ? dificuldadesEmocionaisDetalhes.trim()
          : null,

      tem_atend_psico:
        acompanhamentoPsico === "Sim",

      tempo_atend_psico:
        acompanhamentoPsico === "Sim"
          ? tempoAcompanhamento.trim()
          : null,
    };

    try {
      const resposta = await fetch(
        `${apiUrl}/api/Anamnese`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const textoResposta = await resposta.text();

      let resultado = {};

      try {
        resultado = textoResposta
          ? JSON.parse(textoResposta)
          : {};
      } catch {
        resultado = {};
      }

      if (!resposta.ok) {
        throw new Error(
          resultado.error ||
            resultado.message ||
            "Não foi possível salvar os dados psicológicos."
        );
      }

      router.push({
        pathname: "./config5",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message ||
          "Não foi possível salvar os dados psicológicos."
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
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
        </View>

        <Text style={styles.titulo}>
          Avaliação psicológica
        </Text>

        <View style={styles.formGrid}>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Enfrenta dificuldades emocionais ou psicológicas?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  dificuldadesEmocionais === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setDificuldadesEmocionais("Sim")
                }
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  dificuldadesEmocionais === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setDificuldadesEmocionais("Não");
                  setDificuldadesEmocionaisDetalhes("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {dificuldadesEmocionais === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Descreva:"
                  value={dificuldadesEmocionaisDetalhes}
                  onChangeText={
                    setDificuldadesEmocionaisDetalhes
                  }
                />
              </View>
            )}
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Realiza algum acompanhamento psicológico?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  acompanhamentoPsico === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setAcompanhamentoPsico("Sim")
                }
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  acompanhamentoPsico === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setAcompanhamentoPsico("Não");
                  setTempoAcompanhamento("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {acompanhamentoPsico === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Há quanto tempo?"
                  value={tempoAcompanhamento}
                  onChangeText={setTempoAcompanhamento}
                />
              </View>
            )}
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui algum transtorno emocional ou comportamental?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  possuiDisturbio === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setPossuiDisturbio("Sim")
                }
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  possuiDisturbio === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setPossuiDisturbio("Não");
                  setQualDisturbio("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {possuiDisturbio === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Qual/quais?"
                  value={qualDisturbio}
                  onChangeText={setQualDisturbio}
                />
              </View>
            )}
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