import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getConteoEntregas, getEntregasPorDisposicion } from './service/EntregaService';


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
        const conteo = await getConteoEntregas();
        const disposiciones = conteo.map(c => c.disposicion);

        if (disposiciones.includes('En ruta')) {
          const enCursoData = await getEntregasPorDisposicion(mapDisposiciones['En ruta']);
          setEnCurso(enCursoData);
        }
        if (disposiciones.includes('Entregado')) {
          const finalizadasData = await getEntregasPorDisposicion(mapDisposiciones['Entregado']);
          setFinalizadas(finalizadasData);
        }
      } catch (error) {
        console.error('Error al cargar entregas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
                  <Text style={styles.statusText}>{entrega.estado}</Text>
                </View>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="user" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.encargado}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="map-marker" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.direccion}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="clock-o" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.hora}</Text>
              </View>
            </View>
          ))
        ) : (
          finalizadas.map((entrega) => (
            <View key={entrega.id} style={styles.deliveryCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.deliveryTitle}>{entrega.titulo}</Text>
                <View style={[styles.statusBadge, styles.completedBadge]}>
                  <Text style={styles.statusText}>{entrega.estado}</Text>
                </View>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="user" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.encargado}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="map-marker" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.direccion}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Icon name="calendar" size={14} color="#555" />
                <Text style={styles.infoText}>{entrega.fecha} - {entrega.hora}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomMenu}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('Admin')}
              >
                <Icon name="home" size={24} color="#0066cc" />
                <Text style={styles.menuText}>Inicio</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('Personal')}
              >
                <Icon name="users" size={24} color="#333" />
                <Text style={styles.menuText}>Personal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.menuItem, styles.activeMenuItem]}
                onPress={() => navigation.navigate('Facturas')}
              >
                <Icon name="truck" size={24} color="black" />
                <Text style={[styles.menuText, styles.activeMenuText]}>Bodega</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('Advertencia')}
              >
                <Icon name="exclamation-triangle" size={24} color="#333" />
                <Text style={styles.menuText}>Alertas</Text>
              </TouchableOpacity>
      </View>
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