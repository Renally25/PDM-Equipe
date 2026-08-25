import { router } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

export default function Login() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <Image
        source={require("../assets/images/Logo Raggio.png")}
        style={{ height: 200, width: 200, borderRadius: 100}}
      />
      <Text style={styles.titulo}>Entrar</Text>
      <Text style={styles.subtitle}>Use os dados enviados pela academia</Text>
      <Text style={styles.texto}>E-mail</Text>
      <TextInput placeholder="aluno@gmail.com" style={styles.inputarea} />
      <Text style={styles.texto}>Senha</Text>
      <TextInput
        placeholder="suasenha"
        secureTextEntry
        style={styles.inputarea}
      />
      <Text style={styles.textoOblivio}>Esqueceu a senha?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/bemvindo");
        }}
      >
        <Text style={styles.textbutton}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.texto}>
        Primeiro acesso? Seus dados de login são enviados pela administração da
        academia.
      </Text>
    </ScrollView>
  );
}
