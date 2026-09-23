import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, styles } from "./treinosStyles";
import { obterSessao } from "../utils/session";

const tituloTela = "Meus Treinos";

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API ||
  process.env.NEXT_PUBLIC_AUTH_API;

export default function TreinosScreen() {
  const [chaveAberta, setChaveAberta] = useState(null);
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sessao = obterSessao();
  const codusuario = sessao?.usuario?.codusuario;

  const alternarExpansao = (key) => {
    setChaveAberta((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    async function carregarTreinos() {
      if (!apiUrl) {
        setError("Configure EXPO_PUBLIC_AUTH_API para carregar os treinos.");
        setLoading(false);
        return;
      }

      if (!codusuario) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const resposta = await fetch(
          `${apiUrl}/api/Treino?codusuario=${codusuario}`
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar treinos");
        }

        const dados = await resposta.json();

        setTreinos(dados);
      } catch (requestError) {
        console.error(requestError);
        setError("Não foi possível carregar os treinos.");
      } finally {
        setLoading(false);
      }
    }

    carregarTreinos();
  }, [codusuario]);

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
                    codusuario: String(codusuario),
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

            <Text style={styles.headerTitle}>{tituloTela}</Text>
          </View>

          {loading && (
            <ActivityIndicator
              size="large"
              color={colors.textDark}
            />
          )}

          {!!error && (
            <Text style={styles.observacaoText}>
              {error}
            </Text>
          )}

          {!loading &&
            !error &&
            treinos.map((item) => {
              const estaExpandido =
                chaveAberta === item.codtreino;

              return (
                <View
                  key={item.codtreino}
                  style={styles.card}
                >
                  <TouchableOpacity
                    style={styles.cardHeader}
                    activeOpacity={0.7}
                    onPress={() =>
                      alternarExpansao(item.codtreino)
                    }
                  >
                    <Text style={styles.cardTitle}>
                      {item.descricao}
                    </Text>

                    {!estaExpandido && (
                      <Ionicons
                        name="chevron-down"
                        size={18}
                        color={colors.textDark}
                      />
                    )}
                  </TouchableOpacity>

                  {estaExpandido ? (
                    <View style={styles.expandedPanel}>
                      <View style={styles.listaExercicios}>
                        {item.exercicios &&
                        item.exercicios.length > 0 ? (
                          item.exercicios.map(
                            (exercicio, idx) => (
                              <Text
                                key={exercicio.codexercicio}
                                style={
                                  idx === 0
                                    ? styles.exercicioDestaque
                                    : styles.textoExercicio
                                }
                              >
                                {exercicio.nome},{" "}
                                {exercicio.series} x{" "}
                                {exercicio.repeticoes}
                              </Text>
                            )
                          )
                        ) : (
                          <Text
                            style={styles.textoExercicio}
                          >
                            Nenhum exercício cadastrado.
                          </Text>
                        )}
                      </View>

                      <View style={styles.scrollbarTrack}>
                        <View
                          style={styles.scrollbarThumb}
                        />
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.barraColapsada}
                      activeOpacity={0.7}
                      onPress={() =>
                        alternarExpansao(item.codtreino)
                      }
                    >
                      <Ionicons
                        name="chevron-up"
                        size={16}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}

          {!loading &&
            !error &&
            treinos.length === 0 && (
              <Text style={styles.observacaoText}>
                Nenhum treino encontrado.
              </Text>
            )}
        </ScrollView>

        <View style={styles.barraNavegacaoInferior}>
          <TouchableOpacity
            style={styles.navIconWrapper}
            onPress={() =>
              router.push({
                pathname: "/homeScreen",
                params: {
                  codusuario: String(codusuario),
                },
              })
            }
          >
            <Ionicons
              name="home-outline"
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navIconWrapper}
            onPress={() =>
              router.push({
                pathname: "/profileScreen",
                params: {
                  codusuario: String(codusuario),
                },
              })
            }
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