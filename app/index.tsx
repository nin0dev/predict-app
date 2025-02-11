import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/AdDetailsScreen';
import AddAdScreen from '../screens/AddAdScreen';
import dummyAds from '../data/dummyAds';

type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
};

const Stack = createStackNavigator();

export default function App() {
  const [ads, setAds] = useState<Ad[]>(dummyAds); // Explicitly type ads as an array of Ad

  const addAd = (newAd: Ad) => {
    setAds((prevAds) => [...prevAds, newAd]); // prevAds now has an inferred type of Ad[]
  };

  return (
      <Stack.Navigator>
        <Stack.Screen name="Main">
          {(props) => <MainScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="AddAd">
          {(props) => <AddAdScreen {...props} route={{ ...props.route, params: { addAd } }} />}
        </Stack.Screen>
      </Stack.Navigator>
  );
}