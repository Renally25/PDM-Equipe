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

export default function Config3() {
  const { codusuario } = useLocalSearchParams();

  const [contraceptivo, setContraceptivo] = useState("");
  const [contraceptivoDetalhes, setContraceptivoDetalhes] =
    useState("");

  const [cicloMenstrual, setCicloMenstrual] = useState("");

  const [sintomaTPM, setSintomaTPM] = useState(null);
  const [sintomaTPMDetalhes, setSintomaTPMDetalhes] =
    useState("");

  const [disfuncAssoalhoPelvi, setDisfuncAssoalhoPelvi] =
    useState(null);
  const [
    disfuncAssoalhoPelviDetalhes,
    setDisfuncAssoalhoPelviDetalhes,
  ] = useState("");

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const canContinue = Boolean(
    contraceptivo &&
      cicloMenstrual &&
      sintomaTPM &&
      disfuncAssoalhoPelvi &&
      (contraceptivo === "Não" ||
        contraceptivoDetalhes.trim()) &&
      (sintomaTPM === "Não" ||
        sintomaTPMDetalhes.trim()) &&
      (disfuncAssoalhoPelvi === "Não" ||
        disfuncAssoalhoPelviDetalhes.trim())
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
      etapa: "mulher",

      usa_metodo_contraceptivo:
        contraceptivo === "Sim",

      metodo_contraceptivo:
        contraceptivo === "Sim"
          ? contraceptivoDetalhes.trim()
          : null,

      ciclo_menstrual: cicloMenstrual,

      tem_tpm: sintomaTPM === "Sim",

      sintomas_tpm:
        sintomaTPM === "Sim"
          ? sintomaTPMDetalhes.trim()
          : null,

      tem_disfuncao_assoalho_pelvico:
        disfuncAssoalhoPelvi === "Sim",

      disfuncao_assoalho_pelvico:
        disfuncAssoalhoPelvi === "Sim"
          ? disfuncAssoalhoPelviDetalhes.trim()
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
            "Não foi possível salvar os dados de saúde da mulher."
        );
      }

      router.push({
        pathname: "./config4",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message ||
          "Não foi possível salvar os dados de saúde da mulher."
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
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
        </View>

        <Text style={styles.titulo}>
          Saúde e Bem-estar da Mulher
        </Text>

        <View style={styles.formGrid}>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Utiliza algum contraceptivo?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  contraceptivo === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setContraceptivo("Sim")
                }
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  contraceptivo === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setContraceptivo("Não");
                  setContraceptivoDetalhes("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {contraceptivo === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais contraceptivos?"
                  value={contraceptivoDetalhes}
                  onChangeText={
                    setContraceptivoDetalhes
                  }
                />
              </View>
            )}
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Como é o seu ciclo menstrual?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  cicloMenstrual === "Regular" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setCicloMenstrual("Regular")
                }
              >
                <Text style={styles.textoSelecao}>
                  Regular
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  cicloMenstrual === "Irregular" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setCicloMenstrual("Irregular")
                }
              >
                <Text style={styles.textoSelecao}>
                  Irregular
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui sintomas relacionados à TPM?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  sintomaTPM === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setSintomaTPM("Sim")
                }
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  sintomaTPM === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setSintomaTPM("Não");
                  setSintomaTPMDetalhes("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {sintomaTPM === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais sintomas?"
                  value={sintomaTPMDetalhes}
                  onChangeText={
                    setSintomaTPMDetalhes
                  }
                />
              </View>
            )}
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui disfunções do assoalho pélvico?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  disfuncAssoalhoPelvi === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setDisfuncAssoalhoPelvi("Sim")
                }
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  disfuncAssoalhoPelvi === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setDisfuncAssoalhoPelvi("Não");
                  setDisfuncAssoalhoPelviDetalhes("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {disfuncAssoalhoPelvi === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais disfunções?"
                  value={disfuncAssoalhoPelviDetalhes}
                  onChangeText={
                    setDisfuncAssoalhoPelviDetalhes
                  }
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.decisions}>
        <TouchableOpacity
          style={styles.buttonContinuar}
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