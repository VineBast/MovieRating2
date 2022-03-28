import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./components/Login";
import HomeScreen from "./components/HomeScreen";
import MoviesList from './components/MoviesList';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Linking } from 'react-native';
import { Card } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Profil'
          component={Login}
        />
        <Stack.Screen
          name="Ajouter"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Films"
          component={MoviesList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;