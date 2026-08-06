import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
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

export default function Config2() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [disponibilidade, setDisponibilidade] = useState(null);
  const [nivelAtividade, setNivelAtividade] = useState(null);
  const [musculacao, setMusculacao] = useState(null);
  const [tempoMusculacao, setTempoMusculacao] = useState("");
  const [doencasCronicas, setDoencasCronicas] = useState(null);
  const [doencasCronicasDetalhes, setDoencasCronicasDetalhes] = useState("");
  const [medicamentos, setMedicamentos] = useState(null);
  const [medicamentosDetalhes, setMedicamentosDetalhes] = useState("");
  const [histLesao, setHistLesao] = useState(null);
  const [histLesaoDetalhes, setHistLesaoDetalhes] = useState("");
  const [restricaoMedica, setRestricaoMedica] = useState(null);
  const [restricaoMedicaDetalhes, setRestricaoMedicaDetalhes] = useState("");

  const canContinue = Boolean(
    peso.trim() &&
    altura.trim() &&
    disponibilidade &&
    nivelAtividade &&
    musculacao &&
    doencasCronicas &&
    medicamentos &&
    histLesao &&
    restricaoMedica &&
    (musculacao === "Não" || tempoMusculacao.trim()) &&
    (doencasCronicas === "Não" || doencasCronicasDetalhes.trim()) &&
    (medicamentos === "Não" || medicamentosDetalhes.trim()) &&
    (histLesao === "Não" || histLesaoDetalhes.trim()) &&
    (restricaoMedica === "Não" || restricaoMedicaDetalhes.trim()),
  );

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
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
        </View>
        <Text style={styles.titulo}>Dados Físicos</Text>
        <View style={styles.inputContainers}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputFisico}>Peso (kg)</Text>
            <TextInput
              style={styles.inputArea}
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputFisico}>Altura (cm)</Text>
            <TextInput
              style={styles.inputArea}
              keyboardType="numeric"
              value={altura}
              onChangeText={setAltura}
            />
          </View>
        </View>
        <View style={styles.formGrid}>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Nível de atividade física atual
            </Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  nivelAtividade === "Sedentario" && styles.opcaoSelecionada,
                ]}
                onPress={() => setNivelAtividade("Sedentario")}
              >
                <Text style={styles.textoSelecao}>Sedentário</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  nivelAtividade === "Leve" && styles.opcaoSelecionada,
                ]}
                onPress={() => setNivelAtividade("Leve")}
              >
                <Text style={styles.textoSelecao}>Leve</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  nivelAtividade === "Moderado" && styles.opcaoSelecionada,
                ]}
                onPress={() => setNivelAtividade("Moderado")}
              >
                <Text style={styles.textoSelecao}>Moderado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  nivelAtividade === "Intenso" && styles.opcaoSelecionada,
                ]}
                onPress={() => setNivelAtividade("Intenso")}
              >
                <Text style={styles.textoSelecao}>Intenso</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>Disponibilidade de treino</Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  disponibilidade === "2x semana" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDisponibilidade("2x semana")}
              >
                <Text style={styles.textoSelecao}>2x por semana</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  disponibilidade === "3x semana" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDisponibilidade("3x semana")}
              >
                <Text style={styles.textoSelecao}>3x por semana</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  disponibilidade === "4x semana" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDisponibilidade("4x semana")}
              >
                <Text style={styles.textoSelecao}>4x por semana</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  disponibilidade === "5x semana" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDisponibilidade("5x semana")}
              >
                <Text style={styles.textoSelecao}>5x por semana</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Já praticou musculação antes?
            </Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  musculacao === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setMusculacao("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  musculacao === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setMusculacao("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {musculacao === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Tempo praticando musculação (anos)"
                  value={tempoMusculacao}
                  onChangeText={setTempoMusculacao}
                />
              </View>
            )}
          </View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>Possui doenças crônicas?</Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  doencasCronicas === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDoencasCronicas("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  doencasCronicas === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDoencasCronicas("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {doencasCronicas === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais doenças crônicas?"
                  value={doencasCronicasDetalhes}
                  onChangeText={setDoencasCronicasDetalhes}
                />
              </View>
            )}
          </View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Está tomando algum medicamento?
            </Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  medicamentos === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setMedicamentos("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  medicamentos === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setMedicamentos("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {medicamentos === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais medicamentos?"
                  value={medicamentosDetalhes}
                  onChangeText={setMedicamentosDetalhes}
                />
              </View>
            )}
          </View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>Histórico de lesões?</Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  histLesao === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setHistLesao("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  histLesao === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setHistLesao("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {histLesao === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais lesões?"
                  value={histLesaoDetalhes}
                  onChangeText={setHistLesaoDetalhes}
                />
              </View>
            )}
          </View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Possui alguma restrição médica?
            </Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  restricaoMedica === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setRestricaoMedica("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  restricaoMedica === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setRestricaoMedica("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {restricaoMedica === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais restrições médicas?"
                  value={restricaoMedicaDetalhes}
                  onChangeText={setRestricaoMedicaDetalhes}
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
          onPress={() => {
            if (!canContinue) {
              Alert.alert(
                "Faltam dados",
                "Preencha todos os campos obrigatórios antes de continuar.",
              );
              return;
            }
            router.push("/config3");
          }}
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
