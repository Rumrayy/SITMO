import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importar pantallas
import LoginScreen from '../App/login';
import ChangePasswordScreen from '../App/password';
import AdminScreen from '../App/inicioadmin_p';
import PersonalScreen from '../App/p_admin';
import PersonalbodegaScreen from '../App/p_bodega';
import PersonalMotoristaScreen from '../App/p_motorista';
import NuevoUsuarioScreen from '../App/new_usuario';
import LocationComponent from '../App/p_admin_ubicacion';

// Definir los tipos de las rutas
export type RootStackParamList = {
  Login: undefined;
  ChangePassword: undefined;
  Admin: undefined;
  Personal: undefined;
  PersonalBodega: undefined;
  PersonalMotorista: undefined;
  NuevoUsuario: undefined;
  Ubicacion: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Cambiar Contraseña' }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Panel Admin' }} />
        <Stack.Screen name="Personal" component={PersonalScreen} options={{ title: 'Personal' }} />
        <Stack.Screen name="PersonalBodega" component={PersonalbodegaScreen} options={{ title: 'Personal Bodega' }} />
        <Stack.Screen name="PersonalMotorista" component={PersonalMotoristaScreen} options={{ title: 'Personal Motorista' }} />
        <Stack.Screen name="NuevoUsuario" component={NuevoUsuarioScreen} options={{ title: 'Nuevo Usuario' }} />
        <Stack.Screen name="Ubicacion" component={LocationComponent} options={{ title: 'Ubicación' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
