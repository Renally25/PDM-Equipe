import { StyleSheet } from "react-native";
   export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B4231",
  },
  titulo: {
    fontSize: 33,
    fontWeight: "bold",
    margin: 10,
    color: "#D5CDB8",
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: "#BCAD88",
  },
  butao:{
    backgroundColor: '#D5CDB8',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    margin: 10
  },
  activeButton: {
    backgroundColor: '#656C47',
    borderColor: '#D5CDB8',
    borderWidth: 2,
    
  },
  inactiveButton: {
    backgroundColor: '#D5CDB8',
  },
  textbutton: {
    color: '#3B4231',
    fontSize: 30,
    fontWeight: 'bold',
  },
  aviso: {
    fontSize: 20,
    margin: 10,
    color: "#BCAD88",
  }
});