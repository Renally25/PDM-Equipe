import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#D5CDB8",
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5CDB8",
  },
  titulo: {
    fontSize: 45,
    color: "#3B4231",
    margin: 10,
  },
  subtitulo: {
    fontSize: 20,
    color: "#656C47",
    width: 318,
    marginBottom: 80,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    width: 150,
    marginLeft: -30,
  },
  minitext: {
    fontSize: 12,
    color: "#013E24",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#3B4231",
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 50,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    margin: 7,
  },
  icon: {
    backgroundColor: "#414B334D",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});
