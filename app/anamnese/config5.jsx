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

export default function Config5() {
  const { codusuario } = useLocalSearchParams();

  const [sofreuLesao, setSofreuLesao] = useState(null);
  const [lesaoDetalhe, setLesaoDetalhe] = useState("");

  const [fezFisio, setFezFisio] = useState(null);
  const [motivoFisio, setMotivoFisio] = useState("");

  const [dorMusc, setDorMusc] = useState(null);
  const [dorMuscDetalhe, setDorMuscDetalhe] = useState("");

  const [desvioPostural, setDesvioPostural] = useState(null);
  const [qualDesvio, setQualDesvio] = useState("");

  const [limitForca, setLimitForca] = useState(null);
  const [qualLimit, setQualLimit] = useState("");

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const canContinue = Boolean(
    sofreuLesao &&
      fezFisio &&
      dorMusc &&
      desvioPostural &&
      limitForca &&
      (sofreuLesao === "Não" || lesaoDetalhe.trim()) &&
      (fezFisio === "Não" || motivoFisio.trim()) &&
      (dorMusc === "Não" || dorMuscDetalhe.trim()) &&
      (desvioPostural === "Não" || qualDesvio.trim()) &&
      (limitForca === "Não" || qualLimit.trim())
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
      etapa: "fisioterapica",

      tem_lesao_exercicio: sofreuLesao === "Sim",
      lesao_exercicio:
        sofreuLesao === "Sim"
          ? lesaoDetalhe.trim()
          : null,

      fez_fisio: fezFisio === "Sim",
      motivo_fez_fisio:
        fezFisio === "Sim"
          ? motivoFisio.trim()
          : null,

      tem_dor_dur_exercicio: dorMusc === "Sim",
      onde_dor_dur_exercicio:
        dorMusc === "Sim"
          ? dorMuscDetalhe.trim()
          : null,

      tem_desvio_post: desvioPostural === "Sim",
      desvio_post:
        desvioPostural === "Sim"
          ? qualDesvio.trim()
          : null,

      tem_limit_forca: limitForca === "Sim",
      limit_forca:
        limitForca === "Sim"
          ? qualLimit.trim()
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
            "Não foi possível salvar os dados da avaliação fisioterápica."
        );
      }

      router.push({
        pathname: "./config6",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message ||
          "Não foi possível salvar os dados da avaliação fisioterápica."
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
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
        </View>

        <Text style={styles.titulo}>
          Avaliação fisioterápica
        </Text>

        <View style={styles.formGrid}>
          {/* LESÃO */}
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Já sofreu lesão muscular, articular ou óssea durante exercícios?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  sofreuLesao === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => setSofreuLesao("Sim")}
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  sofreuLesao === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setSofreuLesao("Não");
                  setLesaoDetalhe("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {sofreuLesao === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Qual/quais?"
                  value={lesaoDetalhe ?? ""}
                  onChangeText={setLesaoDetalhe}
                />
              </View>
            )}
          </View>

          {/* FISIOTERAPIA */}
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Já realizou fisioterapia para lesões relacionadas a musculação?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  fezFisio === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => setFezFisio("Sim")}
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  fezFisio === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setFezFisio("Não");
                  setMotivoFisio("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {fezFisio === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Para qual condição?"
                  value={motivoFisio ?? ""}
                  onChangeText={setMotivoFisio}
                />
              </View>
            )}
          </View>

          {/* DOR */}
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Sente dor ou desconforto durante ou após a musculação?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  dorMusc === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => setDorMusc("Sim")}
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  dorMusc === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setDorMusc("Não");
                  setDorMuscDetalhe("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {dorMusc === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Onde?"
                  value={dorMuscDetalhe ?? ""}
                  onChangeText={setDorMuscDetalhe}
                />
              </View>
            )}
          </View>

          {/* DESVIO POSTURAL */}
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui diagnóstico de desvios posturais?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  desvioPostural === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setDesvioPostural("Sim")
                }
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  desvioPostural === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setDesvioPostural("Não");
                  setQualDesvio("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {desvioPostural === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Qual/quais?"
                  value={qualDesvio ?? ""}
                  onChangeText={setQualDesvio}
                />
              </View>
            )}
          </View>

          {/* LIMITAÇÃO */}
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Apresenta limitações de mobilidade ou força?
            </Text>

            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  limitForca === "Sim" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => setLimitForca("Sim")}
              >
                <Text style={styles.textoSelecao}>
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  limitForca === "Não" &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => {
                  setLimitForca("Não");
                  setQualLimit("");
                }}
              >
                <Text style={styles.textoSelecao}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            {limitForca === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Qual/quais?"
                  value={qualLimit ?? ""}
                  onChangeText={setQualLimit}
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
