import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:5000/login", { // Use localhost for iOS simulator or 10.0.2.2 for Android emulator
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Succès", data.message);
        navigation.navigate("Home"); // Navigate to the main screen
      } else {
        Alert.alert("Erreur", data.error || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Problème de connexion au serveur.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Se connecter" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>Pas encore inscrit ? S'inscrire</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10, width: "100%" },
  link: { color: "blue", marginTop: 10 },
});

export default LoginScreen;
