import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "./configPerfilStyles";

export default function Config3() {
  const [contraceptivo, setContraceptivo] = useState("");
  const [contraceptivoDetalhes, setContraceptivoDetalhes] = useState("");
  const [cicloMenstrual, setCicloMenstrual] = useState("");
  const [sintomaTPM, setSintomaTPM] = useState(null);
  const [sintomaTPMDetalhes, setSintomaTPMDetalhes] = useState("");
  const [disfuncAssoalhoPelvi, setDisfuncAssoalhoPelvi] = useState(null);
  const [disfuncAssoalhoPelviDetalhes, setDisfuncAssoalhoPelviDetalhes] =
    useState("");

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
        <Text style={styles.titulo}>Saúde e Bem-estar da Mulher</Text>
        <View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>
              Utiliza algum contraceptivo?
            </Text>
            <View style={styles.containerSelecao}>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  contraceptivo === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setContraceptivo("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  contraceptivo === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setContraceptivo("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {contraceptivo === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais contraceptivos?"
                  value={contraceptivoDetalhes}
                  onChangeText={setContraceptivoDetalhes}
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
                  cicloMenstrual === "Regular" && styles.opcaoSelecionada,
                ]}
                onPress={() => setCicloMenstrual("Regular")}
              >
                <Text style={styles.textoSelecao}>Regular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  cicloMenstrual === "Irregular" && styles.opcaoSelecionada,
                ]}
                onPress={() => setCicloMenstrual("Irregular")}
              >
                <Text style={styles.textoSelecao}>Irregular</Text>
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
                  sintomaTPM === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setSintomaTPM("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  sintomaTPM === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setSintomaTPM("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {sintomaTPM === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais sintomas?"
                  value={sintomaTPMDetalhes}
                  onChangeText={setSintomaTPMDetalhes}
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
                  disfuncAssoalhoPelvi === "Sim" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDisfuncAssoalhoPelvi("Sim")}
              >
                <Text style={styles.textoSelecao}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.opcaoSelecao,
                  disfuncAssoalhoPelvi === "Não" && styles.opcaoSelecionada,
                ]}
                onPress={() => setDisfuncAssoalhoPelvi("Não")}
              >
                <Text style={styles.textoSelecao}>Não</Text>
              </TouchableOpacity>
            </View>
            {disfuncAssoalhoPelvi === "Sim" && (
              <View style={styles.opcaoInputContainer}>
                <TextInput
                  style={styles.opcaoInput}
                  placeholder="Quais disfunções?"
                  value={disfuncAssoalhoPelviDetalhes}
                  onChangeText={setDisfuncAssoalhoPelviDetalhes}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.decisions}>
        <TouchableOpacity
          style={styles.buttonContinuar}
          onPress={() => router.push("/config4")}
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
