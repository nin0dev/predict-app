import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword || !nom || !prenom || !adresse) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.10:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          confirm_password: confirmPassword,
          nom,
          prenom,
          adresse,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Succès", "Inscription réussie !");
        navigation.navigate("Login"); // Redirection vers la page de connexion
      } else {
        Alert.alert("Erreur", data.error || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Problème de connexion au serveur.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Nom d'utilisateur" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Adresse" value={adresse} onChangeText={setAdresse} />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmer le mot de passe" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <Button title="S'inscrire" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Déjà un compte ? Connectez-vous</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10, width: "100%" },
  link: { color: "blue", marginTop: 10 },
});

export default RegisterScreen;