import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./components/Login";
import HomeScreen from "./components/HomeScreen";
import MoviesList from './components/MoviesList';
import Movie from './components/Movie';

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
          name="Accueil"
          component={HomeScreen}
          options={{headerLeft: null }}
        />
        <Stack.Screen
          name="Films"
          component={MoviesList}
        />
        <Stack.Screen
          name="Détails"
          component={Movie}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;