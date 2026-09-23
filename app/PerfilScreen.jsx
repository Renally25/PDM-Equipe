import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, styles } from "./perfilStyles";
import { obterSessao } from "../utils/session";

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API ||
  process.env.NEXT_PUBLIC_AUTH_API;

const screenTitle = "Meu perfil";

export default function PerfilScreen() {
  const { codusuario } = useLocalSearchParams();

  const sessao = obterSessao();

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario || sessao?.usuario?.codusuario;

  const [dadosFisicos, setDadosFisicos] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    async function buscarDadosFisicos() {
      console.log("CODUSUARIO:", codigoUsuario);

      if (!codigoUsuario) {
        console.log("CODUSUARIO NÃO EXISTE");
        return;
      }

      try {
        const url = `${apiUrl}/api/Anamnese?codusuario=${codigoUsuario}&etapa=fisicos`;

        console.log("FAZENDO FETCH:", url);

        const resposta = await fetch(url);

        console.log("STATUS:", resposta.status);

        const dados = await resposta.json();

        console.log("DADOS RECEBIDOS:", dados);

        if (!resposta.ok) {
          console.error("ERRO DA API:", dados);
          return;
        }

        setDadosFisicos(dados);
      } catch (error) {
        console.error("ERRO NO FETCH:", error);
      }
    }

    buscarDadosFisicos();
  }, [codigoUsuario]);

  const ficha = [
    {
      label: "Peso",
      value: dadosFisicos
        ? `${dadosFisicos.peso}kg`
        : "Carregando...",
    },
    {
      label: "Altura",
      value: dadosFisicos
        ? `${dadosFisicos.altura}cm`
        : "Carregando...",
    },
    {
      label: "Nível atual",
      value: dadosFisicos
        ? dadosFisicos.atividade
        : "Carregando...",
    },
    {
      label: "Treino",
      value: dadosFisicos
        ? `${dadosFisicos.frequencia}${
            dadosFisicos.tempo_treino
              ? ` - ${dadosFisicos.tempo_treino}`
              : ""
          }`
        : "Carregando...",
    },
  ];

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.frame}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                router.push({
                  pathname: "/homeScreen",
                  params: {
                    codusuario: String(codigoUsuario),
                  },
                })
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={colors.textDark}
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              {screenTitle}
            </Text>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatarCircle}>
              <Ionicons
                name="person-outline"
                size={32}
                color={colors.textDark}
              />
            </View>

            <Text style={styles.userName}>
              Meu perfil
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Ficha
            </Text>

            {ficha.map((item) => (
              <View
                key={item.label}
                style={styles.infoRow}
              >
                <Text style={styles.infoLabel}>
                  {item.label}
                </Text>

                <Text style={styles.infoValue}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.collapsibleRow}
            activeOpacity={0.7}
            onPress={() => toggleSection("senha")}
          >
            <Text style={styles.collapsibleLabel}>
              Alterar senha
            </Text>

            <Ionicons
              name={
                openSections.senha
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={18}
              color={colors.textDark}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.collapsibleRow}
            activeOpacity={0.7}
            onPress={() =>
              toggleSection("notificacoes")
            }
          >
            <Text style={styles.collapsibleLabel}>
              Notificações
            </Text>

            <Ionicons
              name={
                openSections.notificacoes
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={18}
              color={colors.textDark}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}