import { router } from "expo-router";

import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import styles from "./styles";

import { definirSessao } from "../utils/session";

const apiUrl =
  process.env.EXPO_PUBLIC_AUTH_API ||
  process.env.NEXT_PUBLIC_AUTH_API;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin() {
    setErro("");

    // Verifica se a API está configurada
    if (!apiUrl) {
      setErro(
        "Configure EXPO_PUBLIC_AUTH_API para entrar."
      );
      return;
    }

    // Verifica os campos
    if (!email.trim() || !senha) {
      setErro(
        "Informe seu e-mail e sua senha."
      );
      return;
    }

    setCarregando(true);

    try {
      // Faz login
      const resposta = await fetch(
        `${apiUrl}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            senha,
          }),
        }
      );

      // Tenta obter o JSON da API
      const dados = await resposta.json();

      console.log(
        "RESPOSTA DO LOGIN:",
        dados
      );

      // Verifica erro no login
      if (!resposta.ok) {
        throw new Error(
          dados.message ||
            dados.mensagem ||
            "Login inválido."
        );
      }

      // Verifica se a API retornou o usuário
      if (!dados.usuario) {
        console.error(
          "A API não retornou o objeto usuario:",
          dados
        );

        throw new Error(
          "O login foi realizado, mas os dados do usuário não foram retornados."
        );
      }

      // Tenta localizar o código do usuário
      const codusuario =
        dados.usuario.codusuario ??
        dados.usuario.codUsuario ??
        dados.usuario.id ??
        dados.usuario.idusuario;

      console.log(
        "CODUSUARIO RECEBIDO NO LOGIN:",
        codusuario
      );

      // Se não encontrou o código
      if (
        codusuario === undefined ||
        codusuario === null
      ) {
        console.error(
          "Não foi possível encontrar codusuario em dados.usuario:",
          dados.usuario
        );

        throw new Error(
          "O servidor não retornou o código do usuário."
        );
      }

      console.log(
        "PRIMEIRO ACESSO:",
        dados.usuario.primeiro_acesso
      );

      // Salva a sessão
      definirSessao({
        token: dados.token,
        usuario: dados.usuario,
      });

      /*
       * PRIMEIRO ACESSO
       *
       * Se primeiro_acesso = true,
       * passa pela tela de boas-vindas
       * e depois pela anamnese.
       */
      if (dados.usuario.primeiro_acesso === true) {
        router.push({
          pathname: "/bemvindo",
          params: {
            codusuario: String(codusuario),
          },
        });

        return;
      }

      /*
       * ACESSOS POSTERIORES
       *
       * Se primeiro_acesso = false,
       * vai diretamente para a HomeScreen.
       */
      router.push({
        pathname: "/homeScreen",
        params: {
          codusuario: String(codusuario),
        },
      });
    } catch (requestError) {
      console.error(
        "Erro no login:",
        requestError
      );

      setErro(
        requestError?.message ||
          "Não foi possível entrar."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <Image
        source={require("../assets/images/Logo Raggio.png")}
        style={{
          height: 200,
          width: 200,
          borderRadius: 100,
        }}
      />

      <Text style={styles.titulo}>
        Entrar
      </Text>

      <Text style={styles.subtitle}>
        Use os dados enviados pela academia
      </Text>

      <Text style={styles.texto}>
        E-mail
      </Text>

      <TextInput
        placeholder="aluno@gmail.com"
        style={styles.inputarea}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.texto}>
        Senha
      </Text>

      <TextInput
        placeholder="suasenha"
        secureTextEntry
        style={styles.inputarea}
        value={senha}
        onChangeText={setSenha}
      />

      {!!erro && (
        <Text style={styles.texto}>
          {erro}
        </Text>
      )}

      <Text style={styles.textoOblivio}>
        Esqueceu a senha?
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={fazerLogin}
        disabled={carregando}
      >
        <Text style={styles.textbutton}>
          {carregando
            ? "Entrando..."
            : "Entrar"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.texto}>
        Primeiro acesso? Seus dados de login são enviados pela administração da
        academia.
      </Text>
    </ScrollView>
  );
}