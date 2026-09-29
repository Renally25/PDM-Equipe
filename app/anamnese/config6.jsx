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

export default function Config6() {
  const { codusuario } = useLocalSearchParams();

  const [temdoenca, setTemdoenca] = useState(null);
  const [doenca, setDoenca] = useState("");
  const [usaMedicamento, setUsaMedicamento] = useState(null);
  const [medicamento, setMedicamento] = useState("");
  const [temRestricao, setTemRestricao] = useState(null);
  const [restricao, setRestricao] = useState("");
  const [temLesao, setTemLesao] = useState(null);
  const [lesao, setLesao] = useState("");

  const codigoUsuario = Array.isArray(codusuario) ? codusuario[0] : codusuario;

  const canContinue = Boolean(
    temdoenca &&
    usaMedicamento &&
    temRestricao &&
    temLesao &&
    (temdoenca === "Não" || doenca.trim()) &&
    (usaMedicamento === "Não" || medicamento.trim()) &&
    (temRestricao === "Não" || restricao.trim()) &&
    (temLesao === "Não" || lesao.trim()),
  );

  async function handleContinuar() {
    if (!codigoUsuario) {
      Alert.alert("Erro", "Não foi possível identificar o usuário.");
      return;
    }

    if (!canContinue) {
      Alert.alert(
        "Faltam dados",
        "Responda todas as perguntas e informe os detalhes solicitados.",
      );
      return;
    }

    const dados = {
      codusuario: Number(codigoUsuario),
      tem_doenca: temdoenca === "Sim",
      doenca: temdoenca === "Sim" ? doenca.trim() : null,
      usa_medicamento: usaMedicamento === "Sim",
      medicamento: usaMedicamento === "Sim" ? medicamento.trim() : null,
      tem_restricao: temRestricao === "Sim",
      restricao: temRestricao === "Sim" ? restricao.trim() : null,
      tem_lesao: temLesao === "Sim",
      lesao: temLesao === "Sim" ? lesao.trim() : null,
    };

    try {
      const chave = `anamnese_${codigoUsuario}`;
      const dadosExistentes = await AsyncStorage.getItem(chave);
      const anamneseExistente = dadosExistentes
        ? JSON.parse(dadosExistentes)
        : {};

      await AsyncStorage.setItem(
        chave,
        JSON.stringify({ ...anamneseExistente, ...dados }),
      );

      router.push({
        pathname: "./config7",
        params: { codusuario: String(codigoUsuario) },
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível salvar os dados clínicos.",
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

        <Text style={styles.titulo}>Dados Clínicos</Text>

        <View style={styles.formGrid}>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui alguma doença ou condição de saúde diagnosticada?
            </Text>

            <View style={styles.containerSelecao}>
              {["Sim", "Não"].map((opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={[
                    styles.opcaoSelecao,
                    temdoenca === opcao && styles.opcaoSelecionada,
                  ]}
                  onPress={() => {
                    setTemdoenca(opcao);
                    if (opcao === "Não") setDoenca("");
                  }}
                >
                  <Text style={styles.textoSelecao}>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {temdoenca === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Informe a condição de saúde"
                  value={doenca}
                  onChangeText={setDoenca}
                  accessibilityLabel="Condições de saúde"
                />
              </View>
            )}
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Faz uso de algum medicamento atualmente?
            </Text>

            <View style={styles.containerSelecao}>
              {["Sim", "Não"].map((opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={[
                    styles.opcaoSelecao,
                    usaMedicamento === opcao && styles.opcaoSelecionada,
                  ]}
                  onPress={() => {
                    setUsaMedicamento(opcao);
                    if (opcao === "Não") setMedicamento("");
                  }}
                >
                  <Text style={styles.textoSelecao}>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {usaMedicamento === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Informe o nome e a dose, se souber"
                  value={medicamento}
                  onChangeText={setMedicamento}
                  accessibilityLabel="Medicamentos utilizados"
                />
              </View>
            )}
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui alguma restrição médica para praticar exercícios físicos?
            </Text>

            <View style={styles.containerSelecao}>
              {["Sim", "Não"].map((opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={[
                    styles.opcaoSelecao,
                    temRestricao === opcao && styles.opcaoSelecionada,
                  ]}
                  onPress={() => {
                    setTemRestricao(opcao);
                    if (opcao === "Não") setRestricao("");
                  }}
                >
                  <Text style={styles.textoSelecao}>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {temRestricao === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Descreva a restrição"
                  value={restricao}
                  onChangeText={setRestricao}
                  accessibilityLabel="Restrições para exercícios"
                />
              </View>
            )}
          </View>

          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui alguma lesão atualmente?
            </Text>

            <View style={styles.containerSelecao}>
              {["Sim", "Não"].map((opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={[
                    styles.opcaoSelecao,
                    temLesao === opcao && styles.opcaoSelecionada,
                  ]}
                  onPress={() => {
                    setTemLesao(opcao);
                    if (opcao === "Não") setLesao("");
                  }}
                >
                  <Text style={styles.textoSelecao}>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {temLesao === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Descreva a lesão e a região afetada"
                  value={lesao}
                  onChangeText={setLesao}
                  accessibilityLabel="Lesão atual"
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
          <Text style={styles.decisionsContinuar}>Continuar</Text>
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
