import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#D5CDB8",
    },
    titulo: {
        alignSelf: 'flex-start',
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#3B4231",
        marginTop: 100,
        marginLeft: 30,
        marginBottom: 100
    },
    subtitulo: {
        fontSize: 40,
        color: "#656C47",
        marginTop: 15
    },
    decisions:{
        backgroundColor: "#868D6A",
        marginTop: "auto",
        justifyContent: "flex-end",
        alignItems: "center",
        height: 143,
        width: 412
    },
    button: {
        backgroundColor: "#D5CDB8",
        borderRadius: 15,
        margin: 10,
        padding: 10,
        paddingHorizontal: 30,
    }

}
);