import { StyleSheet } from "react-native";

export const colors = {
  background: "#DAD3C0",
  darkGreen: "#5B6B4C",
  cardBorder: "#3C4A34",
  cardBackground: "#DAD3C0",
  textDark: "#2B2B2B",
  white: "#FFFFFF",
  whiteFaded: "rgba(255,255,255,0.85)",
  scrollbar: "rgba(255,255,255,0.6)",
  frameBorder: "#000000",
  navGreen: "#3C4A34",
  lightGreen: "#88935B",
};

export const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: colors.frameBorder,
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.textDark,
  },

  // Card (accordion item)
  card: {
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    marginBottom: 18,
    overflow: "hidden",
    backgroundColor: colors.cardBackground,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    flexShrink: 1,
    lineHeight: 21,
  },
  chevronCollapsedWrapper: {
    paddingVertical: 2,
  },

  // Expanded panel with exercises
  expandedPanel: {
    backgroundColor: colors.darkGreen,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginHorizontal: 8,
    marginBottom: 8,
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 10,
    flexDirection: "row",
  },
  listaExercicios: {
    flex: 1,
  },
  exercicioDestaque: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  textoExercicio: {
    color: colors.whiteFaded,
    fontSize: 13,
    marginBottom: 4,
  },
  scrollbarTrack: {
    width: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginLeft: 8,
    justifyContent: "flex-start",
  },
  scrollbarThumb: {
    width: 4,
    height: 28,
    borderRadius: 2,
    backgroundColor: colors.scrollbar,
  },

  // Barra colapsada (apenas uma tira verde com chevron)
  barraColapsada: {
    backgroundColor: colors.darkGreen,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginHorizontal: 8,
    marginBottom: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  observacaoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 12,
    marginBottom: 20,
  },
  observacaoLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 10,
  },
  observacaoText: {
    fontSize: 13,
    color: colors.textDark,
    lineHeight: 20,
  },

  // Barra de navegação inferior
  barraNavegacaoInferior: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.navGreen,
    paddingVertical: 16,
  },
  navIconWrapper: {
    padding: 6,
  },
});
