import { StyleSheet } from 'react-native';

export const colors = {
  background: '#DAD3C0',
  textDark: '#2B2B2B',
  textMuted: '#5C5C52',
  inputBorder: '#3C4A34',
  inputBackground: '#DAD3C0',
  bottomSection: '#8B9174',
  buttonBackground: '#2B2B2B',
  buttonText: '#FFFFFF',
  footerText: '#3C4A34',
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

  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 6,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textDark,
  },
  dateText: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 22,
    marginLeft: 34,
  },

  // Seção "Como foi seu dia?"
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 10,
  },
  textAreaBox: {
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    backgroundColor: colors.inputBackground,
    padding: 14,
    minHeight: 110,
  },
  textAreaText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
  },

  // Rodapé fixo (fundo verde oliva)
  bottomSection: {
    backgroundColor: colors.bottomSection,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonBackground,
    borderRadius: 28,
    paddingVertical: 14,
    width: '100%',
  },
  saveButtonText: {
    color: colors.buttonText,
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8,
  },
  footerText: {
    color: colors.footerText,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 17,
  },
});
