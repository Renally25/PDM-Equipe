import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, styles } from "./diarioStyles";

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API ||
  process.env.NEXT_PUBLIC_AUTH_API;

const screenTitle = "Diário de Hoje";
const currentDate = "Quarta, 2 de abril de 2026";
const footerNote = "Seu psicólogo\npoderá ver este registro.";

export default function DiarioScreen() {
  const { codusuario } = useLocalSearchParams();

  const codigoUsuario = Array.isArray(codusuario)
    ? codusuario[0]
    : codusuario;

  const [entryText, setEntryText] = useState("");

  async function salvarDiario() {
    if (!entryText.trim()) {
      return;
    }

    try {
      const resposta = await fetch(`${apiUrl}/api/Diario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao: entryText.trim(),
          codusuario: Number(codigoUsuario),
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        console.error("Erro ao salvar diário:", dados);
        return;
      }

      router.push({
        pathname: "/homeScreen",
        params: {
          codusuario: String(codigoUsuario),
        },
      });
    } catch (error) {
      console.error("Erro ao salvar diário:", error);
    }
  }

  return (
    <View style={styles.frame}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollArea}
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

            <Text style={styles.headerTitle}>{screenTitle}</Text>
          </View>

          <Text style={styles.dateText}>{currentDate}</Text>

          <Text style={styles.sectionLabel}>
            Como foi seu dia?
          </Text>

          <View style={styles.textAreaBox}>
            <TextInput
              style={styles.textAreaText}
              value={entryText}
              onChangeText={setEntryText}
              multiline
              maxLength={255}
              placeholder="Escreva sobre o seu dia..."
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={salvarDiario}
          >
            <Text style={styles.saveButtonText}>
              Salvar e enviar
            </Text>

            <Ionicons
              name="arrow-forward"
              size={16}
              color={colors.buttonText}
            />
          </TouchableOpacity>

          <Text style={styles.footerText}>
            {footerNote}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}