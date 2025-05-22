import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../App/AuthContext';
import BottomNavbar from './NavBarAdmin';

const AdminScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('enCurso');
  const [enCurso, setEnCurso] = useState([]);
  const [finalizadas, setFinalizadas] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapDisposiciones = {
    'En ruta': 2,
    'Entregado': 3,
  };
  useEffect(() => {
  const loadData = async () => {
    try {
      const rawFacturas = await AsyncStorage.getItem('facturas');
      const rawUsers = await AsyncStorage.getItem('customUsers');

      const facturas = rawFacturas ? JSON.parse(rawFacturas) : [];
      const users = rawUsers ? JSON.parse(rawUsers) : [];

      // Enriquecer las facturas con info del repartidor
      const facturasConRepartidor = facturas.map(factura => {
        const repartidor = users.find(u => u.email === factura.repartidorEmail);
        return {
          ...factura,
          encargado: repartidor ? `${repartidor.name} ${repartidor.lastName || ''}` : 'No asignado',
        };
      });

      const enCursoData = facturasConRepartidor.filter(f =>
        f.status && f.status.toLowerCase() === 'en camino'
      );

      const finalizadasData = facturasConRepartidor.filter(f =>
        f.status && ['entregado', 'finalizado'].includes(f.status.toLowerCase())
      );

      setEnCurso(enCursoData);
      setFinalizadas(finalizadasData);
    } catch (error) {
      console.error('Error al cargar facturas desde AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = navigation.addListener('focus', loadData);
  return unsubscribe;
}, [navigation]);



const { logout } = useContext(AuthContext);

const handleLogout = async () => {
  try {
    logout(); // si usas AuthContext
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
  return (
    <View style={styles.container}>
      {/* Mapa más grande y elevado */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 13.7942,
            longitude: -88.8965,
            latitudeDelta: 0.5,  // Más zoom
            longitudeDelta: 0.5,
          }}
          loadingEnabled={true}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, activeTab === 'enCurso' && styles.activeFilter]}
          onPress={() => setActiveTab('enCurso')}
        >
          <Text style={styles.filterText}>EN CURSO</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeTab === 'finalizadas' && styles.activeFilter]}
          onPress={() => setActiveTab('finalizadas')}
        >
          <Text style={styles.filterText}>FINALIZADAS</Text>
        </TouchableOpacity>
      </View>

      {/* Listado de entregas */}
      <ScrollView style={styles.deliveriesContainer}>
      {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : activeTab === 'enCurso' ? (
          enCurso.map((entrega) => (
            <View key={entrega.id} style={styles.deliveryCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.deliveryTitle}>{entrega.titulo}</Text>
                <View style={[styles.statusBadge, styles.inProgressBadge]}>
                  <Text style={styles.statusText}>{entrega.status}</Text>
                </View>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="user" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.encargado}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="user" size={14} color="#555" />
                 <Text style={styles.infoText}>{entrega.descripcion}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="clock-o" size={14} color="#555" />
                 <Text style={styles.infoText}>{entrega.fechaEntrega}</Text>
              </View>
            </View>
          ))
        ) : (
          finalizadas.map((entrega) => (
            <View key={entrega.id} style={styles.deliveryCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.deliveryTitle}>{entrega.titulo}</Text>
                <View style={[styles.statusBadge, styles.completedBadge]}>
                 <Text style={styles.statusText}>{entrega.status}</Text>
                </View>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="user" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.encargado}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="user" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.descripcion}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="calendar" size={14} color="#555" />
               <Text style={styles.infoText}>{entrega.fechaEntrega}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    
  },
  mapContainer: {
    height: 150, 
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeFilter: {
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#0066cc',
  },
  filterText: {
    fontWeight: 'bold',
    color: '#333',
  },
  deliveriesContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  deliveryCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  inProgressBadge: {
    backgroundColor: '#FFF3E0',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});

export default AdminScreen;