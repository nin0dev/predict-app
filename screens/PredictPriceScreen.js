import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

const PredictPriceScreen = () => {
  const [surface, setSurface] = useState("");
  const [nombreChambres, setNombreChambres] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = async () => {
    if (!surface || !nombreChambres || !localisation) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.10:5000/predict_price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surface: parseFloat(surface),
          nombre_chambres: parseInt(nombreChambres),
          localisation,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPredictedPrice(data.predicted_price);
      } else {
        Alert.alert("Erreur", data.error || "Problème lors de la prédiction.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Problème de connexion au serveur.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimation du Prix Immobilier</Text>
      <TextInput
        style={styles.input}
        placeholder="Surface en m²"
        keyboardType="numeric"
        value={surface}
        onChangeText={setSurface}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de chambres"
        keyboardType="numeric"
        value={nombreChambres}
        onChangeText={setNombreChambres}
      />
      <TextInput
        style={styles.input}
        placeholder="Localisation"
        value={localisation}
        onChangeText={setLocalisation}
      />
      <Button title="Estimer le prix" onPress={handlePredict} />
      {predictedPrice !== null && (
        <Text style={styles.result}>Prix estimé: {predictedPrice} €</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10, width: "100%" },
  result: { fontSize: 20, marginTop: 20, color: "green" },
});

export default PredictPriceScreen;