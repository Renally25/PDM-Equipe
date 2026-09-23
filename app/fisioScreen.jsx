import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { colors, styles } from "./fisioStyles";
import { obterSessao } from "../utils/session";

const tituloTela = "Fisioterapia";

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API || process.env.NEXT_PUBLIC_AUTH_API;

export default function FisioScreen() {
  const [protocolos, setProtocolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarProtocolos() {
      if (!apiUrl) {
        setError("Configure EXPO_PUBLIC_AUTH_API para carregar os protocolos.");
        setLoading(false);
        return;
      }

      const sessao = obterSessao();
      const codusuario = sessao?.usuario?.codusuario;

      if (!codusuario) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const respostaProtocolos = await fetch(
          `${apiUrl}/api/Protocolo?codusuario=${codusuario}`,
        );
        if (!respostaProtocolos.ok) {
          throw new Error("Erro ao buscar protocolos");
        }

        const protocolos = await respostaProtocolos.json();
        const protocolosComExercicios = await Promise.all(
          protocolos.map(async (protocolo) => {
            const respostaExercicios = await fetch(
              `${apiUrl}/api/Exercicio?codprotocolo=${protocolo.codprotocolo}`,
            );
            if (!respostaExercicios.ok) {
              throw new Error("Erro ao buscar exercícios");
            }

            const exercicios = await respostaExercicios.json();
            return {
              key: String(protocolo.codprotocolo),
              code: protocolo.codprotocolo,
              description: protocolo.descricao || "Protocolo de fisioterapia",
              exercises: exercicios.map((exercicio) =>
                `${exercicio.nome}: ${exercicio.series || 0} séries - ${exercicio.repeticoes || 0} repetições`,
              ),
            };
          }),
        );

        setProtocolos(protocolosComExercicios);
      } catch (requestError) {
        console.error(requestError);
        setError("Não foi possível carregar os protocolos.");
      } finally {
        setLoading(false);
      }
    }

    carregarProtocolos();
  }, []);

  return (
    <View style={styles.frame}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/homeScreen")}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color={colors.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{tituloTela}</Text>
          </View>

          {loading && <ActivityIndicator size="large" color={colors.textDark} />}
          {!!error && <Text style={styles.observacaoText}>{error}</Text>}

          {!loading && !error && protocolos.map((item) => (
            <View key={item.key} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                  Protocolo {item.code} - {item.description}
                </Text>
              </View>

              <View style={styles.expandedPanel}>
                <View style={styles.listaExercicios}>
                  {item.exercises.map((exercicio, idx) => (
                    <Text
                      key={exercicio}
                      style={
                        idx === 0
                          ? styles.exercicioDestaque
                          : styles.textoExercicio
                      }
                    >
                      {exercicio}
                    </Text>
                  ))}
                </View>
                <View style={styles.scrollbarTrack}>
                  <View style={styles.scrollbarThumb} />
                </View>
              </View>
            </View>
          ))}

          {!loading && !error && protocolos.length === 0 && (
            <Text style={styles.observacaoText}>Nenhum protocolo encontrado.</Text>
          )}

          <View style={styles.observacaoContainer}>
            <Text style={styles.observacaoLabel}>Observação</Text>
            <Text style={styles.observacaoText}>
              Observação do fisioterapeuta será exibida aqui quando disponível.
            </Text>
          </View>
        </ScrollView>

        {/* Barra de navegação inferior */}
        <View style={styles.barraNavegacaoInferior}>
          <TouchableOpacity style={styles.navIconWrapper}>
            <Ionicons
              name="home-outline"
              size={26}
              color={colors.white}
              onPress={() => router.push("/homeScreen")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconWrapper}>
            <Ionicons
              name="person-outline"
              size={26}
              color={colors.white}
              onPress={() => router.push("/PerfilScreen")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
