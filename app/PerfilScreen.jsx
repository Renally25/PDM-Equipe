import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from './perfilStyles';

// ---- Dados mockados (fáceis de substituir por props/estado/API) ----
const screenTitle = 'Meu perfil';

const user = {
  name: 'Gabriela Xavier',
};

const ficha = [
  { label: 'Peso', value: '70kg' },
  { label: 'Altura', value: '175cm' },
  { label: 'Nível atual', value: 'Leve' },
  { label: 'Treino', value: '3x - 45min' },
];

const collapsibleOptions = [
  { key: 'senha', label: 'Alterar senha' },
  { key: 'notificacoes', label: 'Notificações' },
];

export default function PerfilScreen({ onBack }) {
  // Controla quais seções colapsáveis estão abertas (nenhuma por padrão)
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.frame}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={22} color={colors.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{screenTitle}</Text>
          </View>

          {/* Avatar + nome */}
          <View style={styles.profileSection}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={32} color={colors.textDark} />
            </View>
            <Text style={styles.userName}>{user.name}</Text>
          </View>

          {/* Ficha */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ficha</Text>
            {ficha.map((item) => (
              <View key={item.label} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Seções colapsáveis */}
          {collapsibleOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.collapsibleRow}
              activeOpacity={0.7}
              onPress={() => toggleSection(option.key)}
            >
              <Text style={styles.collapsibleLabel}>{option.label}</Text>
              <Ionicons
                name={openSections[option.key] ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={colors.textDark}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
