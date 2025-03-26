import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importar pantallas
import LoginScreen from '../App/login';
import ChangePasswordScreen from '../App/password';
import AdminScreen from '../App/inicioadmin_p';
import PersonalScreen from '../App/p_admin ';
import PersonalBodegaScreen from '../App/p_bodega';
import PersonalMotoristaScreen from '../App/p_motorista';
import NuevoUsuarioScreen from '../App/new_usuario';
import LocationComponent from '../App/p_admin_ubicacion';
import BodegaScreen from '../App/bodega';
import AdvertenciaScreen from '../App/advertencia';
import AsignarRepartidorScreen from '../App/b_asignar_repartidor'; 
import MapScreen from '../App/mapa';
import FacturasScreen from '../App/factura';  
import FacturaDetalleScreen from '../App/factura_detalle';  


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
  Bodega: undefined;
  Advertencia: undefined;
  AsignarRepartidor: { factura: object };  // Recibe la factura completa
  Mapa: { direccion: string };
  Facturas: undefined;
  FacturaDetalle: { factura: object };  // Recibe la factura completa
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Admin">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} /> 
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Cambiar Contraseña' }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Panel Admin' }} />
        <Stack.Screen name="Personal" component={PersonalScreen} options={{ title: 'Personal' }} />
        <Stack.Screen name="PersonalBodega" component={PersonalBodegaScreen} options={{ title: 'Personal Bodega' }} />
        <Stack.Screen name="PersonalMotorista" component={PersonalMotoristaScreen} options={{ title: 'Personal Motorista' }} />
        <Stack.Screen name="NuevoUsuario" component={NuevoUsuarioScreen} options={{ title: 'Nuevo Usuario' }} />
        <Stack.Screen name="Ubicacion" component={LocationComponent} options={{ title: 'Ubicación' }} />
        <Stack.Screen name="Bodega" component={BodegaScreen} options={{ title: 'Bodega' }} />
        <Stack.Screen name="Advertencia" component={AdvertenciaScreen} options={{ title: 'Adevertencia' }} />
        <Stack.Screen name="AsignarRepartidor" component={AsignarRepartidorScreen} options={{ title: 'Asignar Repartidor' }} />
        <Stack.Screen name="Mapa" component={MapScreen} options={{ title: 'Ver en Mapa' }} />
        <Stack.Screen name="Facturas" component={FacturasScreen} options={{ title: 'Facturas' }} />
        <Stack.Screen name="FacturaDetalle" component={FacturaDetalleScreen} options={{ title: 'Detalles de Factura' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
