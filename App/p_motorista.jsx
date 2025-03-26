import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PersonalMotoristaScreen = () => {
  
  const motoristas = [
    {
      id: '#RP_12345',
      nombre: 'Juana Pérez',
      estado: 'Disponible',
      descripcion: 'Motorista con 2 años de experiencia.',
      entregasHoy: 5,
      tiempoPromedio: '25 min',
    },
    {
      id: '#RP_12542',
      nombre: 'Carlo Pérez',
      estado: 'En entrega',
      descripcion: 'Motorista con 1 año de experiencia.',
      entregasHoy: 9,
      tiempoPromedio: '30 min',
    },
    {
      id: '#RP_12542',
      nombre: 'Carlo Pérez',
      estado: 'En entrega',
      descripcion: 'Motorista con 1 año de experiencia.',
      entregasHoy: 9,
      tiempoPromedio: '30 min',
    },
    
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios..."
        placeholderTextColor="#999"
      />

      <View style={styles.rolesContainer}>
        <TouchableOpacity style={styles.roleItem} >
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleItem, styles.roleActive]}>
          <Text style={styles.roleText}>Motorista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleItem}>
          <Text style={styles.roleText}>Bodega</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.sectionTitle}>Lista de Motoristas</Text>
      <ScrollView style={styles.listContainer}>
        {motoristas.map((motorista, index) => (
          <View key={index} style={styles.motoristaItem}>
            <View style={styles.nameStatusContainer}>
              <Text style={styles.motoristaName}>{motorista.nombre}</Text>
              <Text style={styles.motoristaStatus}>{motorista.estado}</Text>
            </View>
            <Text style={styles.motoristaId}>ID: {motorista.id}</Text>
            <Text style={styles.motoristaId}>{motorista.descripcion}</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{motorista.entregasHoy}</Text>
                <Text style={styles.statLabel}>Entregas Hoy</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{motorista.tiempoPromedio}</Text>
                <Text style={styles.statLabel}>Tiempo Promedio</Text>
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.locationButton}>
                <Icon name="map-marker" size={16} color="#fff" />
                <Text style={styles.locationButtonText}>Ver Ubicación</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.newButton}>
        <Text style={styles.newButtonText}>Nuevo</Text>
      </TouchableOpacity>

      
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    flex: 1, // Asegura que el ScrollView ocupe el espacio restante
    marginBottom: 20,
  },
  motoristaItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  nameStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  motoristaName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  motoristaStatus: {
    fontSize: 14,
    color: '#007BFF',
  },
  motoristaId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#666',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  actionButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  newButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  newButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
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

export default PersonalMotoristaScreen;