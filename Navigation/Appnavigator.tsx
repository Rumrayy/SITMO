import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importar pantallas
import LoginScreen from '../App/login';
import ChangePasswordScreen from '../App/password';
import AdminScreen from '../App/inicioadmin_p';
import PersonalScreen from '../App/p_admin';
import PersonalBodegaScreen from '../App/p_bodega';
import PersonalMotoristaScreen from '../App/p_motorista';
import NuevoUsuarioScreen from '../App/new_usuario';
import LocationComponent from '../App/p_admin_ubicacion';
import AdvertenciaScreen from '../App/advertencia';
import AsignarRepartidorScreen from '../App/b_asignar_repartidor'; 
import MapScreen from '../App/mapa';
import FacturasScreen from '../App/b_factura';  
import FacturaDetalleScreen from '../App/factura_detalle';  
import DetalleEntregaScreen from '../App/detalle_entrega';
import FinalizarEntregaScreen from '../App/finalizar_entrega_form';
import ErrorEntregaScreen from '../App/cancelar_entrega_form';
import Dashboard from '../App/dashboard_repartidor';
import NuevaFacturaScreen from '../App/nuevafactura'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
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
        <Stack.Screen name="Advertencia" component={AdvertenciaScreen} options={{ title: 'Advertencia' }} />
        <Stack.Screen name="AsignarRepartidor" component={AsignarRepartidorScreen} options={{ title: 'Asignar Repartidor' }} />
        <Stack.Screen name="Mapa" component={MapScreen} options={{ title: 'Ver en Mapa' }} />
        <Stack.Screen name="Facturas" component={FacturasScreen} options={{ title: 'Facturas' }} />
        <Stack.Screen name="FacturaDetalle" component={FacturaDetalleScreen} options={{ title: 'Detalles de Factura' }} />
        <Stack.Screen name="DetalleEntrega" component={DetalleEntregaScreen} options={{ title: 'Detalle de Entrega' }} />
        <Stack.Screen name="FinalizarEntrega" component={FinalizarEntregaScreen} options={{ title: 'Finalizar Entrega' }} />
        <Stack.Screen name="ErrorEntrega" component={ErrorEntregaScreen} options={{ title: 'Error de Entrega' }} />
        <Stack.Screen name="Repartidor" component={Dashboard} options={{ title: 'Respartidor' }} />
        <Stack.Screen name="NuevaFactura" component={NuevaFacturaScreen} options={{ title: 'Nueva Factura' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
