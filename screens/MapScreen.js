import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import dummyAds from '../data/dummyAds'; 

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566, // Centered on Paris
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {dummyAds.map((ad) => (
          <Marker
            key={ad.id}
            coordinate={{ latitude: ad.latitude, longitude: ad.longitude }}
            title={ad.title}
            description={ad.description}
            onPress={() => navigation.navigate('Details', { ad })}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});