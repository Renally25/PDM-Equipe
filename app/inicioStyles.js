import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#D5CDB8",
  },
  scrollContent: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3B4231",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: "#656C47",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 26,
  },
  button: {
    backgroundColor: "#3B4231",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
