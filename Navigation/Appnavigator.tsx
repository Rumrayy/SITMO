import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../App/AuthContext';

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
import BodegaScreen from '../App/bod_admin';
import EditarFactura from '../App/EditarFactura';

// 1. Definir los tipos de rutas
type RootStackParamList = {
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
  AsignarRepartidor: undefined;
  Mapa: undefined;
  Facturas: undefined;
  FacturaDetalle: undefined;
  DetalleEntrega: undefined;
  FinalizarEntrega: undefined;
  ErrorEntrega: undefined;
  Dashboard: undefined;
  NuevaFactura: undefined;
  EditarFactura: undefined;
};

// 2. Crear la referencia de navegación CORRECTAMENTE
export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

// 3. Crear el Stack Navigator con tipos
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const redirectBasedOnRole = async () => {
      if (!userToken) {
        setInitializing(false);
        return;
      }

      const userRole = await AsyncStorage.getItem('userRole');

      // Navegación segura con verificación
      if (navigationRef.current) {
        switch (userRole) {
          case 'admin':
            navigationRef.current.navigate('Admin');
            break;
          case 'motorista':
            navigationRef.current.navigate('Dashboard');
            break;
          case 'bodega':
            navigationRef.current.navigate('Facturas');
            break;
          default:
            navigationRef.current.navigate('Login');
        }
      }

      setInitializing(false);
    };

    redirectBasedOnRole();
  }, [userToken]);

  if (isLoading || initializing) {
    return null; // o un loader
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
        ) : (
          <>
            {/* Pantallas autenticadas aquí */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="Personal" component={PersonalScreen} options={{ title: 'Personal' }} />
            <Stack.Screen name="PersonalBodega" component={PersonalBodegaScreen} options={{ title: 'Personal Bodega' }} />
            <Stack.Screen name="PersonalMotorista" component={PersonalMotoristaScreen} options={{ title: 'Personal Motorista' }} />
            <Stack.Screen name="NuevoUsuario" component={NuevoUsuarioScreen} options={{ title: 'Nuevo Usuario' }} />
            <Stack.Screen name="Ubicacion" component={LocationComponent} options={{ title: 'Ubicación' }} />
            <Stack.Screen name="Bodega" component={BodegaScreen} options={{ title: 'Bodega' }} />
            <Stack.Screen name="Advertencia" component={AdvertenciaScreen} options={{ title: 'Advertencia' }} />
            <Stack.Screen name="AsignarRepartidor" component={AsignarRepartidorScreen} options={{ title: 'Asignar Repartidor' }} />
            <Stack.Screen name="Mapa" component={MapScreen} options={{ title: 'Ver en Mapa' }} />
            <Stack.Screen name="Facturas" component={FacturasScreen} options={{ title: 'Facturas' }} />
            <Stack.Screen name="FacturaDetalle" component={FacturaDetalleScreen} options={{ title: 'Detalles de Factura' }} />
            <Stack.Screen name="DetalleEntrega" component={DetalleEntregaScreen} options={{ title: 'Detalle de Entrega' }} />
            <Stack.Screen name="FinalizarEntrega" component={FinalizarEntregaScreen} options={{ title: 'Finalizar Entrega' }} />
            <Stack.Screen name="ErrorEntrega" component={ErrorEntregaScreen} options={{ title: 'Error de Entrega' }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="NuevaFactura" component={NuevaFacturaScreen} options={{ title: 'Nueva Factura' }} />
            <Stack.Screen name="EditarFactura" component={EditarFactura} options={{ title: 'Editar Factura' }} />
            

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;