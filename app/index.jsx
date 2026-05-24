import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { router } from "expo-router";

export default function Tela1() {
  const [selectedId, setSelectedId] = useState(null);


  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://img.freepik.com/vetores-gratis/vetor-de-design-de-gradiente-colorido-de-passaro_343694-2506.jpg?semt=ais_hybrid&w=740&q=80" }} style={{ width: 200, height: 200 }} />
      <Text style={styles.titulo}>Raggio Academia</Text>
      <Text style={styles.subtitle}>Studio Clinfit</Text>
      <TouchableOpacity style={[styles.butao, selectedId === 1
      ? styles.activeButton
      : styles.inactiveButton
  ]}
  onPress={() => {
    setSelectedId(1)
    router.push("/loginAluno")
  }}>
        <Text style={styles.textbutton}>Sou Aluno-Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.butao, selectedId === 2 ? styles.activeButton : styles.inactiveButton]} onPress={() => {
    setSelectedId(2)
    router.push("/loginProfissional")
  }}>
        <Text style={styles.textbutton}>Sou Profissional</Text>
      </TouchableOpacity>
      <Text style={styles.aviso}>Acesso Fornecido pela Raggio Academia</Text>
    </View>
  );
}