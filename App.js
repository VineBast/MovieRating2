import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import Login from "./components/Login";
import HomeScreen from "./components/HomeScreen";
import MoviesList from './components/MoviesList';
import Movie from './components/Movie';

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 100, height: 50 }}
      source={require('./img/movierating.jpg')}
    />
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Profil'
          component={Login}
          options={{
            headerTitle: () => LogoTitle(),
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="Accueil"
          component={HomeScreen}
          options={{
            headerTitle: () => LogoTitle(),
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="Films"
          component={MoviesList}
          options={{
            headerTitle: () => LogoTitle(),
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="Détails"
          component={Movie}
          options={{
            headerTitle: () => LogoTitle(),
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;