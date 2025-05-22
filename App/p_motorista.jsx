import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderRolesNav from './HeaderRolesAdmin';
import BottomNavbar from './NavBarAdmin';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const PersonalMotoristaScreen = () => {
  const navigation = useNavigation();

  const [motoristas, setMotoristas] = useState([]);
  const generateRandomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};
const handleDeleteUser = async (emailToDelete) => {
  try {
    const storedUsers = await AsyncStorage.getItem('customUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = users.filter(u => u.email !== emailToDelete);

    await AsyncStorage.setItem('customUsers', JSON.stringify(updatedUsers));

    // Actualiza la lista de motoristas filtrando los nuevos datos
    const updatedMotoristas = updatedUsers
      .filter(u => u.role === 'motorista')
      .map((u) => ({
        ...u,
        id: generateRandomId(),
        estado: 'Disponible',
        entregasHoy: 0,
        tiempoPromedio: '0 min',
        ubicacion: { lat: 13.982521295694758, lng: -89.54769904696455 }
      }));

    setMotoristas(updatedMotoristas);
  } catch (error) {
    console.error('Error eliminando usuario:', error);
  }
};

useEffect(() => {
  const loadMotoristas = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('customUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const onlyMotoristas = users
        .filter(u => u.role === 'motorista')
        .map((u, index) => ({
          ...u,
          id: generateRandomId(),
          estado: 'Disponible',
          entregasHoy: 0,
          tiempoPromedio: '0 min',
          ubicacion:{ lat: 13.982521295694758, lng: -89.54769904696455 }
        }));

      setMotoristas(onlyMotoristas);
    } catch (error) {
      console.error('Error cargando motoristas:', error);
    }
  };

  loadMotoristas();
}, []);

  return (
    <View style={styles.container}>


      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios..."
        placeholderTextColor="#999"
      />

      <HeaderRolesNav activeRole="Motorista" />


      <Text style={styles.sectionTitle}>Lista de Motoristas</Text>
      <ScrollView style={styles.listContainer}>
        {motoristas.map((motorista, index) => (
          <View key={index} style={styles.motoristaItem}>
            <View style={styles.nameStatusContainer}>
              <Text style={styles.motoristaName}>{motorista.name || motorista.username}</Text>
              <Text style={styles.motoristaStatus}>{motorista.estado}</Text>
            </View>
            <Text style={styles.motoristaId}>ID: {motorista.id}</Text>
            <Text style={styles.motoristaId}>Correo: {motorista.email}</Text>
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
              <TouchableOpacity style={styles.actionButton}  
             onPress={() =>
                Alert.alert(
                  'Confirmar eliminación',
                  `¿Seguro que deseas eliminar a ${motorista.name}?`,
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Eliminar', style: 'destructive', onPress: () => handleDeleteUser(motorista.email) }
                  ]
                )
              }
              >
                <Text style={styles.actionButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => navigation.navigate('NuevoUsuario')}
      >
        <Text style={styles.newButtonText}>Nuevo</Text>
      </TouchableOpacity>

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