import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

// ---- Dados mockados (fáceis de substituir por props/estado/API) ----
const screenTitle = "Diário de Hoje";
const currentDate = "Quarta, 2 de abril de 2026";
const footerNote = "Seu psicólogo\npoderá ver este registro.";

export default function DiarioScreen({ onSave }) {
  const [entryText, setEntryText] = useState("");

  return (
    <View style={styles.frame}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/homeScreen")}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color={colors.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{screenTitle}</Text>
          </View>
          <Text style={styles.dateText}>{currentDate}</Text>

          {/* Como foi seu dia? */}
          <Text style={styles.sectionLabel}>Como foi seu dia?</Text>
          <View style={styles.textAreaBox}>
            <TextInput
              style={styles.textAreaText}
              value={entryText}
              onChangeText={setEntryText}
              multiline
              placeholder="Escreva sobre o seu dia..."
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </ScrollView>

        {/* Rodapé com botão de salvar */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={onSave}
          >
            <Text style={styles.saveButtonText}>Salvar e enviar</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={colors.buttonText}
            />
          </TouchableOpacity>
          <Text style={styles.footerText}>{footerNote}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
