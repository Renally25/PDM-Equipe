import { StyleSheet } from 'react-native';

export const colors = {
  background: '#DAD3C0',
  cardBorder: '#3C4A34',
  cardBackground: '#DAD3C0',
  textDark: '#2B2B2B',
  textMuted: '#6B6B60',
  avatarBackground: '#DAD3C0',
  avatarBorder: '#3C4A34',
  frameBorder: '#000000',
};

export const styles = StyleSheet.create({
  frame: {
    flex: 1,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 30,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textDark,
  },

  // Avatar + nome
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: colors.avatarBorder,
    backgroundColor: colors.avatarBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },

  // Ficha card
  card: {
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.cardBackground,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: 13,
    color: colors.textDark,
    fontWeight: '500',
  },

  // Linhas colapsáveis (Alterar senha, Notificações)
  collapsibleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: colors.cardBackground,
  },
  collapsibleLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
});
