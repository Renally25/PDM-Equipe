import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./configPerfilStyles";

export default function ConfigTermo() {
  const { codusuario, objetivos, expectativas } = useLocalSearchParams();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const objetivoUsuario = Array.isArray(objetivos)
    ? objetivos[0]
    : objetivos;

  const expectativaUsuario = Array.isArray(expectativas)
    ? expectativas[0]
    : expectativas;

  const apiUrl =
    process.env.EXPO_PUBLIC_AUTH_API ||
    process.env.NEXT_PUBLIC_AUTH_API;

  const handleConfirm = async () => {
    if (!isConfirmed) {
      Alert.alert(
        "Confirmação necessária",
        "Marque a autorização para continuar.",
      );
      return;
    }

    if (!codigoUsuario) {
      Alert.alert(
        "Erro",
        "Código do usuário não encontrado.",
      );
      return;
    }

    if (!objetivoUsuario?.trim() || !expectativaUsuario?.trim()) {
      Alert.alert(
        "Erro",
        "Os objetivos e as expectativas não foram encontrados.",
      );
      return;
    }

    if (!apiUrl) {
      Alert.alert(
        "Erro",
        "URL da API não configurada.",
      );
      return;
    }

    try {
      setEnviando(true);

      const dados = {
        codusuario: Number(codigoUsuario),
        etapa: "motivacao",
        expectativa: expectativaUsuario.trim(),
        objetivo: objetivoUsuario.trim(),
        o_que_motivou: null,
        comprometimento: null,
        aceitou_termo_lgpd: true,
      };

      const resposta = await fetch(`${apiUrl}/api/Anamnese`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensagem ||
            "Não foi possível salvar os dados.",
        );
      }

      router.push({
        pathname: "/inicio",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (erro) {
      console.error("Erro ao salvar motivação:", erro);

      Alert.alert(
        "Erro",
        erro instanceof Error
          ? erro.message
          : "Não foi possível salvar seus dados. Tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
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
          <View style={styles.etapasPreenchido} />
        </View>

        <Text style={styles.titulo}>
          Confirme suas informações
        </Text>

        <View style={styles.containersSelecao}>
          <Text style={styles.textoSelecao}>
            Declaro que autorizo o uso dos meus dados pessoais, conforme a Lei
            Geral de Proteção de dados (Lei nº 13.709/2018) para fins de
            atendimento e acompanhamento no Raggio Studio ClinFit.
          </Text>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsConfirmed(!isConfirmed)}
            disabled={enviando}
          >
            <View
              style={[
                styles.checkbox,
                isConfirmed && styles.checkboxChecked,
              ]}
            >
              {isConfirmed && (
                <AntDesign
                  name="check"
                  size={16}
                  color="white"
                />
              )}
            </View>

            <Text style={styles.captchaText}>
              {isConfirmed
                ? "Confirmado"
                : "Concordo e autorizo o uso dos meus dados pessoais"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.decisions}>
        <TouchableOpacity
          style={[
            styles.buttonContinuar,
            !isConfirmed && styles.buttonDisabled,
          ]}
          disabled={!isConfirmed || enviando}
          onPress={handleConfirm}
        >
          <Text style={styles.decisionsContinuar}>
            {enviando ? "Enviando..." : "Enviar e continuar"}
          </Text>

          {!enviando && (
            <AntDesign
              name="arrow-right"
              size={20}
              color="white"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => router.back()}
          disabled={enviando}
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