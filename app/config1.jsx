import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import styles from "./configPerfilStyles";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Config1() {
  const [image, setImage] = useState(null);

  const pegarImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert("Permissão negada");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Foto de Perfil</Text>
      <TouchableOpacity
        onPressIn={pegarImagem}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <FontAwesome name="user-circle-o" size={90} color="black" />
        )}
      </TouchableOpacity>
      <Text style={styles.subtitulo}>Adicionar foto</Text>
      <View style={styles.decisions}>
        <TouchableOpacity style={styles.buttonContinuar}>
            <Text>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonVoltar}>
            <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
