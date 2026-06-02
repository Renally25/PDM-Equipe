import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./bemvindoStyles";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function Bemvindo() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/vetores-gratis/vetor-de-design-de-gradiente-colorido-de-passaro_343694-2506.jpg?semt=ais_hybrid&w=740&q=80",
        }}
        style={{ width: 200, height: 200 }}
      />

      <Text style={styles.titulo}>Bem-vindo!</Text>
      <Text style={styles.subtitulo}>
        Vamos configurar seu perfil para que seu acompanhamento seja
        personalizado.
      </Text>

      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Feather name="user" size={24} color="#013E24" borderColor="white" />
        </View>
        <Text style={styles.minitext}>Fotos de perfil</Text>
      </View>

      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="dumbbell" size={24} color="#013E24" />
        </View>
        <Text style={styles.minitext}>Dados físicos e objetivos</Text>
      </View>

      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Feather name="heart" size={24} color="#013E24" />
        </View>
        <Text style={styles.minitext}>Estado emocional e saúde</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {router.push("/config1")}}    >
        <Text style={styles.textButton}>Continuar</Text>
        <AntDesign name="arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
