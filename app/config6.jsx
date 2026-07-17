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

export default function Config6() {
  const [objetivos, setObjetivos] = useState(null);
  const [expectativas, setExpectativas] = useState(null);

  const canContinue = objetivos?.trim() && expectativas?.trim();

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
        <Text style={styles.titulo}>Objetivos e expectativas</Text>
        <View>
          <View style={styles.containersSelecao}>
            <Text style={styles.textoSelecao}>Objetivos com a musculação</Text>
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
                placeholder="Quais são suas expectativas com a musculação?"
                value={expectativas}
                onChangeText={setExpectativas}
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
          onPress={() =>
            router.push(
              `/configTermo?objetivos=${encodeURIComponent(objetivos ?? "")}&expectativas=${encodeURIComponent(
                expectativas ?? "",
              )}`,
            )
          }
          disabled={!canContinue}
        >
          <Text style={styles.decisionsContinuar}>Confirmar informações</Text>
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
