import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

const AdminScreen = () => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      {/* Mapa de Google Maps */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE} 
          initialRegion={{
            latitude: 13.7942, // Latitud de El Salvador
            longitude: -88.8965, // Longitud de El Salvador
            latitudeDelta: 1.5, // Ajusta el zoom 
            longitudeDelta: 1.5, // Ajusta el zoom 
          }}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>PENDIENTE</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>EN CURSO</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>FINALIZADO</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Entregas Pendiente / En curso</Text>
      <ScrollView style={styles.deliveriesContainer}>
        <View style={styles.deliveryItem}>
          <Text style={styles.deliveryTitle}>Entrega #1</Text>
          <Text style={styles.deliveryText}>Encargado: Juan Pérez</Text>
          <Text style={styles.deliveryText}>Dirección: Calle Falsa 123</Text>
          <Text style={[styles.deliveryStatus, styles.statusInProgress]}>En Curso</Text>
        </View>
        <View style={styles.deliveryItem}>
          <Text style={styles.deliveryTitle}>Entrega #8</Text>
          <Text style={styles.deliveryText}>Encargado: María Gómez</Text>
          <Text style={styles.deliveryText}>Dirección: Avenida Siempre Viva 456</Text>
          <Text style={[styles.deliveryStatus, styles.statusPending]}>Pendiente</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Admin')}
        >
          <Icon name="home" size={24} color="black" />
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Personal')}
        >
          <Icon name="users" size={24} color="black" />
          <Text style={styles.menuText}>Personal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Bodega')}
        >
          <Icon name="truck" size={24} color="black" />
          <Text style={styles.menuText}>Bodega</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Advertencia')}
        >
          <Icon name="exclamation-triangle" size={24} color="black" />
          <Text style={styles.menuText}>Advertencias</Text>
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
    marginTop: 50,
  },
  mapContainer: {
    height: 200, 
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveriesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  deliveryItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 14,
    marginBottom: 4,
  },
  deliveryStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statusInProgress: {
    color: '#FFA500',
  },
  statusPending: {
    color: '#FF0000',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 10, 
  },
  menuItem: {
    alignItems: 'center', 
  },
  menuText: {
    fontSize: 12, 
    color: 'black', 
    marginTop: 4, 
  },
});

export default AdminScreen;