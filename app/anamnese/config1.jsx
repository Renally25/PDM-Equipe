import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./configPerfilStyles";

export default function Config1() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useLocalSearchParams();
  const codusuario = params.codusuario;

  const canContinue = Boolean(image?.uri);

  const pegarImagem = async () => {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão negada",
          "Permita o acesso à galeria para continuar.",
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
          base64: false,
        });

      if (result.canceled) {
        return;
      }

      const asset = result.assets?.[0];

      if (!asset) {
        Alert.alert(
          "Erro",
          "Não foi possível obter a imagem selecionada.",
        );
        return;
      }

      console.log("Imagem selecionada:");
      console.log("URI:", asset.uri);
      console.log("Tipo:", asset.mimeType);

      setImage({
        uri: asset.uri,
        mimeType: asset.mimeType || "image/jpeg",
      });
    } catch (error) {
      console.error(
        "Erro ao selecionar imagem:",
        error,
      );

      Alert.alert(
        "Erro",
        "Não foi possível selecionar a imagem.",
      );
    }
  };

  async function adicionarFotoPerfil() {
    if (!codusuario) {
      Alert.alert(
        "Erro",
        "O código do usuário não foi informado.",
      );
      return false;
    }

    if (!image?.uri) {
      Alert.alert(
        "Faltam dados",
        "Adicione uma foto de perfil para continuar.",
      );
      return false;
    }

    setLoading(true);

    try {
      const codigoUsuario = Number(codusuario);

      if (Number.isNaN(codigoUsuario)) {
        Alert.alert(
          "Erro",
          "O código do usuário é inválido.",
        );
        return false;
      }

      const url =
        `${process.env.EXPO_PUBLIC_AUTH_API}/api/Usuario`;

      const formData = new FormData();

      formData.append(
        "codusuario",
        String(codigoUsuario),
      );

      const fotoBlob = await fetch(image.uri).then((res) => res.blob());

      formData.append(
        "foto",
        fotoBlob,
        "foto-perfil.jpg"
      );
      //formData.append("foto", {
      //  uri: image.uri,
      //  name: "foto-perfil.jpg",
      //  type: image.mimeType || "image/jpeg",
     // });

      console.log("--------------------------------");
      console.log("ENVIANDO FOTO DE PERFIL");
      console.log("--------------------------------");
      console.log("URL:", url);
      console.log("codusuario:", codigoUsuario);
      console.log("URI:", image.uri);
      console.log("Tipo:", image.mimeType);
      console.log("--------------------------------");

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const respostaTexto = await response.text();

      console.log("--------------------------------");
      console.log("RESPOSTA DA API");
      console.log("--------------------------------");
      console.log("Status:", response.status);
      console.log("Resposta:", respostaTexto);
      console.log("--------------------------------");

      if (!response.ok) {
        let mensagemErro =
          respostaTexto ||
          "Erro desconhecido no servidor.";

        try {
          const erroJson =
            JSON.parse(respostaTexto);

          mensagemErro =
            erroJson.message ||
            erroJson.error ||
            erroJson.mensagem ||
            respostaTexto;
        } catch {}

        throw new Error(
          `Erro ${response.status}: ${mensagemErro}`,
        );
      }

      Alert.alert(
        "Sucesso",
        "Foto de perfil salva com sucesso.",
      );

      return true;
    } catch (error) {
      console.error(
        "Erro ao adicionar foto de perfil:",
        error,
      );

      Alert.alert(
        "Erro",
        error?.message ||
          "Ocorreu um erro ao salvar a foto de perfil.",
      );

      return false;
    } finally {
      setLoading(false);
    }
  }

  const handleContinuar = async () => {
    if (loading) {
      return;
    }

    const salvoComSucesso =
      await adicionarFotoPerfil();

    if (salvoComSucesso) {
      router.push({
        pathname: "./config2",
        params: {
          codusuario: String(codusuario),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.etapasProcesso}>
          <View style={styles.etapasPreenchido} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
        </View>

        <Text style={styles.titulo}>
          Foto de Perfil
        </Text>

        <TouchableOpacity
          onPress={pegarImagem}
          disabled={loading}
          activeOpacity={0.7}
        >
          {image?.uri ? (
            <Image
              source={{
                uri: image.uri,
              }}
              style={styles.avatar}
            />
          ) : (
            <FontAwesome
              name="user-circle-o"
              size={90}
              color="black"
            />
          )}
        </TouchableOpacity>

        <Text style={styles.subtitulo}>
          Adicionar foto
        </Text>
      </ScrollView>

      <View style={styles.decisions}>
        <TouchableOpacity
          style={[
            styles.buttonContinuar,
            (!canContinue || loading) &&
              styles.buttonDisabled,
          ]}
          disabled={!canContinue || loading}
          onPress={handleContinuar}
        >
          <Text style={styles.decisionsContinuar}>
            {loading ? "Salvando..." : "Continuar"}
          </Text>

          {!loading && (
            <AntDesign
              name="arrow-right"
              size={20}
              color="white"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonVoltar}
          disabled={loading}
          onPress={() => router.back()}
        >
          <AntDesign
            name="arrow-left"
            size={20}
            color="#3B4231"
          />

          <Text style={styles.decisionsVoltar}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}