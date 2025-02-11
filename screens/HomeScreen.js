import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'; // Install if needed: npm install react-native-vector-icons
import ListScreen from './ListScreen';
import MapScreen from './MapScreen';

const initialLayout = { width: Dimensions.get('window').width };

export default function MainScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'list', title: 'Liste' },
    { key: 'map', title: 'Carte' },
  ]);

  const renderScene = SceneMap({
    list: () => <ListScreen navigation={navigation} />,
    map: () => <MapScreen navigation={navigation} />,
  });

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FFF' }}
            style={{ backgroundColor: '#6200EE' }}
            labelStyle={{ color: '#FFF', fontWeight: 'bold' }}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAd')}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
});
