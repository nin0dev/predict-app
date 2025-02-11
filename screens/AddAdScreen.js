import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

const AddAdScreen = ({ addAd, navigation }) => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("vente"); // Default type
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: Platform.OS === "ios", // Only iOS supports multiple selection
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [
        ...prevImages,
        ...(result.assets ? result.assets.map((asset) => asset.uri) : []),
      ]);
    }
  };

  const handleSubmit = () => {
    if (!email || !title || !description || !price || !address) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const newAd = {
      id: Date.now().toString(),
      email,
      type,
      title,
      description,
      price: parseFloat(price),
      address,
      images,
    };

    addAd(newAd);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Type d'annonce</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Vente" value="vente" />
          <Picker.Item label="Location" value="location" />
        </Picker>
      </View>

      <Text style={styles.label}>Titre de l'annonce</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description de l'annonce"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Prix (€)</Text>
      <TextInput
        style={styles.input}
        placeholder="Prix"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Adresse</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse du bien"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Photos</Text>
      <Button title="Ajouter des photos" onPress={handleImagePick} />
      {images.length > 0 && (
        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Text style={styles.imageText}>{image.split("/").pop()}</Text>
            </View>
          ))}
        </View>
      )}

      <Button title="Ajouter l'annonce" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 16,
  },
  imagesContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  imageWrapper: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 8,
  },
  imageText: {
    fontSize: 14,
    color: "#333",
  },
});

export default AddAdScreen;
