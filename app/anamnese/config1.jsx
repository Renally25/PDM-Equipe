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

  // Obtém os parâmetros enviados pela rota anterior
  const params = useLocalSearchParams();

  const codusuario = params.codusuario;

  // Só permite continuar quando existe uma imagem selecionada
  const canContinue = Boolean(image?.uri);

  /**
   * Abre a galeria para o usuário selecionar uma foto
   */
  const pegarImagem = async () => {
    try {
      // Solicita permissão para acessar a galeria
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão negada",
          "Permita o acesso à galeria para continuar."
        );

        return;
      }

      // Abre a galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      // Usuário cancelou a seleção
      if (result.canceled) {
        return;
      }

      const asset = result.assets?.[0];

      if (!asset) {
        Alert.alert(
          "Erro",
          "Não foi possível obter a imagem selecionada."
        );

        return;
      }

      // Verifica se o base64 foi obtido
      if (!asset.base64) {
        Alert.alert(
          "Erro",
          "Não foi possível obter os dados da imagem."
        );

        return;
      }

      console.log("Imagem selecionada:");
      console.log("URI:", asset.uri);
      console.log("Tipo:", asset.mimeType);
      console.log(
        "Tamanho do Base64:",
        asset.base64.length
      );

      // Salva os dados da imagem
      setImage({
        uri: asset.uri,
        base64: asset.base64,
        mimeType: asset.mimeType || "image/jpeg",
      });
    } catch (error) {
      console.error(
        "Erro ao selecionar imagem:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível selecionar a imagem."
      );
    }
  };

  /**
   * Envia a foto para o servidor
   */
  async function adicionarFotoPerfil() {
    // Verifica se existe usuário
    if (!codusuario) {
      Alert.alert(
        "Erro",
        "O código do usuário não foi informado."
      );

      console.error(
        "codusuario não foi encontrado nos parâmetros:",
        params
      );

      return false;
    }

    // Verifica se existe imagem
    if (!image?.base64) {
      Alert.alert(
        "Faltam dados",
        "Adicione uma foto de perfil para continuar."
      );

      return false;
    }

    setLoading(true);

    try {
      // Converte o código para número
      const codigoUsuario = Number(codusuario);

      if (Number.isNaN(codigoUsuario)) {
        Alert.alert(
          "Erro",
          "O código do usuário é inválido."
        );

        console.error(
          "codusuario inválido:",
          codusuario
        );

        return false;
      }

      // URL da API
      const url =
        `${process.env.EXPO_PUBLIC_AUTH_API}/api/Usuario`;

      // Dados enviados para o backend
      const dados = {
        codusuario: codigoUsuario,
        fotoperfil: image.base64,
        fotoperfil_tipo:
          image.mimeType || "image/jpeg",
      };

      console.log("--------------------------------");
      console.log("ENVIANDO FOTO DE PERFIL");
      console.log("--------------------------------");
      console.log("URL:", url);
      console.log(
        "codusuario:",
        dados.codusuario
      );
      console.log(
        "fotoperfil_tipo:",
        dados.fotoperfil_tipo
      );
      console.log(
        "Tamanho Base64:",
        dados.fotoperfil.length
      );
      console.log("--------------------------------");

      // Faz a requisição
      const response = await fetch(url, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(dados),
      });

      // Lê a resposta do servidor
      const respostaTexto =
        await response.text();

      console.log("--------------------------------");
      console.log("RESPOSTA DA API");
      console.log("--------------------------------");
      console.log(
        "Status:",
        response.status
      );
      console.log(
        "Resposta:",
        respostaTexto
      );
      console.log("--------------------------------");

      // Se o servidor retornar erro
      if (!response.ok) {
        let mensagemErro =
          respostaTexto ||
          "Erro desconhecido no servidor.";

        // Tenta interpretar como JSON
        try {
          const erroJson =
            JSON.parse(respostaTexto);

          mensagemErro =
            erroJson.message ||
            erroJson.error ||
            erroJson.mensagem ||
            respostaTexto;
        } catch {
          // A resposta não era JSON
        }

        throw new Error(
          `Erro ${response.status}: ${mensagemErro}`
        );
      }

      // Sucesso
      Alert.alert(
        "Sucesso",
        "Foto de perfil salva com sucesso."
      );

      return true;
    } catch (error) {
      console.error(
        "Erro ao adicionar foto de perfil:",
        error
      );

      Alert.alert(
        "Erro",
        error?.message ||
          "Ocorreu um erro ao salvar a foto de perfil."
      );

      return false;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Continua para a próxima etapa
   */
  const handleContinuar = async () => {
    // Evita múltiplos cliques
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
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={true}
      >
        {/* Indicador das etapas */}
        <View style={styles.etapasProcesso}>
          <View style={styles.etapasPreenchido} />

          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
          <View style={styles.etapasVazio} />
        </View>

        {/* Título */}
        <Text style={styles.titulo}>
          Foto de Perfil
        </Text>

        {/* Seleção da foto */}
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

      {/* Botões */}
      <View style={styles.decisions}>
        {/* Continuar */}
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
            {loading
              ? "Salvando..."
              : "Continuar"}
          </Text>

          {!loading && (
            <AntDesign
              name="arrow-right"
              size={20}
              color="white"
            />
          )}
        </TouchableOpacity>

        {/* Voltar */}
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