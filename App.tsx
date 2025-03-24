import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './App/login';
import ChangePasswordScreen from './App/password';
import AdminScreen from './App/inicioadmin_p';
import repartidorScreen from './App/InicioRepartidor';
import bodegadorScreen from './App/InicioBodega';
import PersonalScreen from './App/p_admin';
import PersonalbodegaScreen from './App/p_bodega';
import PersonalMotoristaScreen from './App/p_motorista';
import NuevoUsuarioScreen from './App/new_usuario';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
//<LoginScreen />
//<ChangePasswordScreen />
//<AdminScreen />
//<PersonalScreen />
//<PersonalbodegaScreen />
//<PersonalMotoristaScreen navigation={undefined} />
//<NuevoUsuarioScreen />


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Repartidor" component={repartidorScreen} />
        <Stack.Screen name="Bodega" component={bodegadorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;