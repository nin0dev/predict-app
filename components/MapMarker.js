import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

const MapMarker = ({ ad }) => {
  return (
    <Marker coordinate={ad.location}>
      <View style={styles.markerContainer}>
        <Text style={styles.markerText}>{ad.title}</Text>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MapMarker;
