import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdCard = ({ ad, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.title}>{ad.title}</Text>
        <Text style={styles.price}>{ad.price} €</Text>
        <Text style={styles.description} numberOfLines={2}>
          {ad.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default AdCard;
