import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

const AdminScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('enCurso');
  
  // Datos de ejemplo
  const entregasEnCurso = [
    {
      id: 1,
      titulo: "Entrega #1",
      encargado: "Juan Pérez",
      direccion: "Calle Falsa 123, San Salvador",
      estado: "En camino",
      hora: "10:30 AM"
    },
    {
      id: 2,
      titulo: "Entrega #3",
      encargado: "Carlos Martínez",
      direccion: "Colonia Escalón, Casa #45",
      estado: "En preparación",
      hora: "11:15 AM"
    }
    
  ];

  const entregasFinalizadas = [
    {
      id: 1,
      titulo: "Entrega #5",
      encargado: "María Gómez",
      direccion: "Avenida Siempre Viva 456",
      estado: "Entregado",
      hora: "9:00 AM",
      fecha: "15/05/2023"
    },
    {
      id: 2,
      titulo: "Entrega #7",
      encargado: "Luis Hernández",
      direccion: "Residencial Las Flores, Block 2",
      estado: "Entregado",
      hora: "1:30 PM",
      fecha: "14/05/2023"
    }
  ];

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
        {activeTab === 'enCurso' ? (
          <>
            {entregasEnCurso.map((entrega) => (
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
            ))}
          </>
        ) : (
          <>
            {entregasFinalizadas.map((entrega) => (
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
            ))}
          </>
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
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    height: 250,  // Mapa más grande
    width: '100%',
    marginBottom: 15,
    elevation: 5,  // Sombra para Android
    shadowColor: '#000',  // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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