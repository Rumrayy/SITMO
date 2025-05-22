import React, { useEffect, useState, useContext  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import { Switch } from 'react-native';
import { Alert } from 'react-native';
import { AuthContext } from '../App/AuthContext';
const Dashboard = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
const [facturasRealizadas, setFacturasRealizadas] = useState(0);
const [facturasPendientes, setFacturasPendientes] = useState(0);
const [isActive, setIsActive] = useState(true);
const toggleSwitch = () => setIsActive(previousState => !previousState);

  const [initialCoords, setInitialCoords] = useState({
    latitude: 13.982521295694758, // coordenadas por defecto (San Salvador)
    longitude:  -89.54769904696455,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const { logout } = useContext(AuthContext);
  
  const handleLogout = async () => {
    try {
      logout(); 
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

 useEffect(() => {
  const fetchUser = async () => {
    const userInvoices = allInvoices.filter(f => f.email === currentUser.email);
setInvoices(userInvoices);

const realizadas = userInvoices.filter(f => f.status.toLowerCase() === 'realizada' || f.status.toLowerCase() === 'completado').length;
const pendientes = userInvoices.filter(f => f.status.toLowerCase() === 'pendiente').length;

setFacturasRealizadas(realizadas);
setFacturasPendientes(pendientes);

    try {
      const email = await AsyncStorage.getItem('userEmail');
      const usersRaw = await AsyncStorage.getItem('customUsers');
      const allInvoicesRaw = await AsyncStorage.getItem('facturas'); // ← deberías guardar esto al crear facturas

      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const allInvoices = allInvoicesRaw ? JSON.parse(allInvoicesRaw) : [];

      const currentUser = users.find(u => u.email === email);

      if (currentUser) {
        setUser(currentUser);

        // Coordenadas opcionales
        setInitialCoords({
          latitude: currentUser.lat || 13.982521295694758,
          longitude: currentUser.lng || -89.54769904696455,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // Filtrar facturas del usuario
        const userInvoices = allInvoices.filter(f => f.email === currentUser.email);
        setInvoices(userInvoices);
      }
    } catch (error) {
      console.error('Error cargando usuario o facturas:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido, {user?.name || 'Usuario'}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>
            Estado: {isActive ? 'Activo' : 'Inactivo'}
          </Text>
          <Switch
            value={isActive}
            onValueChange={toggleSwitch}
            thumbColor={isActive ? '#00cc00' : '#ccc'}
          />
        </View>

      {/* Mapa */}
      <MapView style={styles.map} region={initialCoords}>
        <Marker coordinate={initialCoords} title={user?.name || 'Ubicación'} />
      </MapView>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Facturas Realizadas</Text>
          <Text style={styles.statNumber}>{facturasRealizadas}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Facturas Pendientes</Text>
          <Text style={styles.statNumber}>{facturasPendientes}</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Lista de Facturas</Text>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.invoiceCard}>
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceTitle}>{item.title}</Text>
              <Text>{item.status}</Text>
            </View>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('DetalleEntrega', { factura: item })}
            >
              <Text style={styles.detailsButtonText}>Detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  invoiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  invoiceInfo: { flex: 1 },
  invoiceTitle: { fontWeight: 'bold', fontSize: 16 },
  detailsButton: { backgroundColor: '#000', padding: 8, borderRadius: 5 },
  detailsButtonText: { color: '#fff' },
  map: {
  width: '100%',
  height: 200, // o cualquier valor visible
  marginBottom: 20,
  borderRadius: 10,
},
header: {
  fontSize: 24, // Más grande
  fontWeight: 'bold',
  marginBottom: 10,
},
statusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
},
statusLabel: {
  fontSize: 16,
  fontWeight: '600',
},
logoutButton: {
  marginTop: 20,
  backgroundColor: '#cc0000',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
},
logoutText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
});

export default Dashboard;
