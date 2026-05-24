import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D5CDB8"
    },
    titulo:{
        fontSize: 32,
        color: "#656C47",
    },
    subtitle: {
        fontSize: 20,
        color: "#847752",
        margin: 10,

    },
    texto: {
        fontSize: 18,
        color: "#847752",
        marginTop: 20,
        alignSelf: "flex-start",
        marginLeft: "10%",
    },
    textoOblivio: {
        fontSize: 16,
        color: "#847752",
        opacity: 0.8,
        marginTop: 5,
        marginBottom: 15,
    },
    inputarea: {
        width: "80%",
        backgroundColor: "#3B4231",
        color: "#fafafa",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        border: "none",
    },
    button: {
        backgroundColor: "#656C47",
        padding: 12,
        borderRadius: 20,
        paddingHorizontal: 50,
    },
    textbutton: {
        color: "#D5CDB8",
        fontSize: 20,
        fontWeight: "bold"
    }


})