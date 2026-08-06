import { StyleSheet } from "react-native";

export const colors = {
  background: "#D5CDB8",
  darkGreen: "#3C4A34",
  textDark: "#2B2B2B",
  textMuted: "#8C8C82",
  white: "#FFFFFF",
  whiteFaded: "rgba(255,255,255,0.75)",
  frameBorder: "#000000",
};

export const styles = StyleSheet.create({
  quadro: {
    flex: 1,
    overflow: "hidden",
  },
  areaSegura: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  visualizacaoRolagem: {
    flex: 1,
  },
  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  // Header
  linhaCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  saudacao: {
    fontSize: 15,
    color: colors.textMuted,
    fontWeight: "400",
  },
  nomeUsuario: {
    fontSize: 20,
    color: colors.textDark,
    fontWeight: "700",
    marginTop: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.darkGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  textoAvatar: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
  },

  // Cartão consulta
  cartaoConsulta: {
    backgroundColor: colors.darkGreen,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  rotuloConsulta: {
    color: colors.whiteFaded,
    fontSize: 13,
    marginBottom: 4,
  },
  valorConsulta: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },

  // Grid
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemGrade: {
    width: "48%",
    alignItems: "center",
    marginBottom: 24,
  },
  caixaIconeGrade: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.darkGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  rotuloGrade: {
    fontSize: 13,
    color: colors.textDark,
    fontWeight: "500",
  },

  // Bottom nav
  barraNavegacaoInferior: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    paddingVertical: 16
  },
  wrapperIconeNavegacao: {
    padding: 6,
  },
});
