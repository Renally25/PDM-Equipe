import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const { codusuario } = useLocalSearchParams();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const apiUrl =
    process.env.EXPO_PUBLIC_AUTH_API ||
    process.env.NEXT_PUBLIC_AUTH_API;

  const handleConfirm = async () => {
    if (!isConfirmed) {
      Alert.alert(
        "Confirmação necessária",
        "Marque a autorização para continuar."
      );
      return;
    }

    if (!codigoUsuario) {
      Alert.alert(
        "Erro",
        "Código do usuário não encontrado."
      );
      return;
    }

    if (!apiUrl) {
      Alert.alert(
        "Erro",
        "URL da API não configurada."
      );
      return;
    }

    try {
      setEnviando(true);

      const chave = `anamnese_${codigoUsuario}`;

      const dadosExistentes = await AsyncStorage.getItem(chave);

      if (!dadosExistentes) {
        throw new Error(
          "Nenhum dado da anamnese foi encontrado."
        );
      }

      const anamnese = JSON.parse(dadosExistentes);

      const dados = {
        ...anamnese,
        codusuario: Number(codigoUsuario),
        aceitou_termo_lgpd: true,
      };

      console.log("DADOS ENVIADOS PARA API:", dados);

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

      console.log("RESPOSTA DA API:", {
        status: resposta.status,
        resultado,
      });

      if (!resposta.ok) {
        throw new Error(
          resultado.message ||
            resultado.error ||
            resultado.mensagem ||
            `Erro HTTP ${resposta.status}`
        );
      }

      await AsyncStorage.removeItem(chave);

      router.push({
        pathname: "/inicio",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (erro) {
      console.error(
        "Erro ao salvar anamnese:",
        erro
      );

      Alert.alert(
        "Erro",
        erro instanceof Error
          ? erro.message
          : "Não foi possível salvar seus dados."
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
            Declaro que autorizo o uso dos meus dados pessoais,
            conforme a Lei Geral de Proteção de dados
            (Lei nº 13.709/2018) para fins de atendimento e
            acompanhamento no Raggio Studio ClinFit.
          </Text>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() =>
              setIsConfirmed(!isConfirmed)
            }
            disabled={enviando}
          >
            <View
              style={[
                styles.checkbox,
                isConfirmed &&
                  styles.checkboxChecked,
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
            !isConfirmed &&
              styles.buttonDisabled,
          ]}
          disabled={!isConfirmed || enviando}
          onPress={handleConfirm}
        >
          <Text style={styles.decisionsContinuar}>
            {enviando
              ? "Enviando..."
              : "Enviar e continuar"}
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