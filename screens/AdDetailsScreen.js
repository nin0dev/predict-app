import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { ad } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ad.title}</Text>
      <Text>{ad.description}</Text>
      <Text style={styles.price}>{ad.price} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  price: {
    color: '#6200EE',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});