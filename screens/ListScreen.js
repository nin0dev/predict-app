import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import dummyAds from '../data/dummyAds';

export default function ListScreen({ navigation }) {
  return (
    <FlatList
      data={dummyAds}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Details', { ad: item })}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.price}>{item.price} €</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  price: {
    color: '#6200EE',
    fontWeight: 'bold',
    marginTop: 5,
  },
});