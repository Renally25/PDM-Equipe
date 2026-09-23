import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { colors, styles } from "./homeScreenStyles";
import { obterSessao } from "../utils/session";

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API ||
  process.env.NEXT_PUBLIC_AUTH_API;

const shortcuts = [
  { key: "treinosScreen", label: "Treinos", icon: "barbell-outline" },
  { key: "diarios", label: "Diários", icon: "pencil-outline" },
  { key: "consultas", label: "Consultas", icon: "calendar-outline" },
  { key: "fisioScreen", label: "Fisioterapia", icon: "location-outline" },
];

export default function HomeScreen() {
  const sessao = obterSessao();
  const nomeUsuario = sessao?.usuario?.nome || "";
  const codigoUsuario = sessao?.usuario?.codusuario;
  const [consultaMaisRecente, setConsultaMaisRecente] =
    useState(null);
  const [carregandoConsulta, setCarregandoConsulta] =
    useState(true);

  useEffect(() => {
    async function carregarConsultaMaisRecente() {
      if (!codigoUsuario) {
        setCarregandoConsulta(false);
        return;
      }

      try {
        const resposta = await fetch(
          `${apiUrl}/api/Consulta?codusuario=${codigoUsuario}`
        );
        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(
            dados.error || "Erro ao buscar consultas"
          );
        }

        const consultasAgendadas = (Array.isArray(dados)
          ? dados
          : dados.consultas || []
        )
          .filter(
            (consulta) =>
              consulta.status === "agendada"
          )
          .map((consulta) => ({
            consulta,
            data: new Date(
              `${String(consulta.dataconsulta).slice(0, 10)}T${consulta.horaconsulta}`
            ),
          }))
          .filter(({ data }) => !Number.isNaN(data.getTime()))
          .sort(
            (first, second) =>
              second.data.getTime() - first.data.getTime()
          );

        setConsultaMaisRecente(
          consultasAgendadas[0]?.consulta || null
        );
      } catch (error) {
        console.error(
          "ERRO AO BUSCAR CONSULTA DA HOME:",
          error
        );
        setConsultaMaisRecente(null);
      } finally {
        setCarregandoConsulta(false);
      }
    }

    carregarConsultaMaisRecente();
  }, [codigoUsuario]);

  const iniciais = nomeUsuario
    ? nomeUsuario
        .split(" ")
        .map((nome) => nome[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <View style={styles.quadro}>
      <SafeAreaView style={styles.areaSegura}>
        <ScrollView
          style={styles.visualizacaoRolagem}
          contentContainerStyle={styles.conteudoRolagem}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.linhaCabecalho}>
            <View>
              <Text style={styles.saudacao}>Olá,</Text>
              <Text style={styles.nomeUsuario}>{nomeUsuario}</Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.textoAvatar}>{iniciais}</Text>
            </View>
          </View>

          <View style={styles.cartaoConsulta}>
            <Text style={styles.rotuloConsulta}>
              Próxima consulta agendada:
            </Text>
            <Text style={styles.valorConsulta}>
              {carregandoConsulta
                ? "Carregando..."
                : consultaMaisRecente
                ? `${consultaMaisRecente.profissional || "Consulta"} - ${new Date(
                    consultaMaisRecente.dataconsulta
                  ).toLocaleDateString("pt-BR")} às ${String(
                    consultaMaisRecente.horaconsulta
                  ).slice(0, 5)}`
                : "Nenhuma consulta agendada"}
            </Text>
          </View>

          <View style={styles.grade}>
            {shortcuts.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.itemGrade}
                activeOpacity={0.7}
                onPress={() => router.push(`/${item.key}`)}
              >
                <View style={styles.caixaIconeGrade}>
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={colors.white}
                  />
                </View>

                <Text style={styles.rotuloGrade}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.barraNavegacaoInferior}>
          <TouchableOpacity style={styles.wrapperIconeNavegacao}>
            <Ionicons
              name="home-outline"
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.wrapperIconeNavegacao}
            onPress={() => router.push("/PerfilScreen")}
          >
            <Ionicons
              name="person-outline"
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}