import React, { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import HeaderRolesNav from './HeaderRolesAdmin';
import BottomNavbar from './NavBarAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const PersonalScreen = () => {
  const navigation = useNavigation();

  const [admins, setAdmins] = useState([]);

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

    // Solo actualiza la lista de admins mostrados
    const updatedAdmins = updatedUsers
      .filter(u => u.role === 'admin')
      .map((u) => ({
        ...u,
        id: generateRandomId(),
        estado: 'Disponible',
      }));

    setAdmins(updatedAdmins);
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    Alert.alert('Error', 'No se pudo eliminar el usuario');
  }
};

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('customUsers');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const onlyAdmins = users
          .filter(u => u.role === 'admin')
          .map(u => ({
            ...u,
            id: generateRandomId(),
            estado: 'Disponible',
          }));

        setAdmins(onlyAdmins);
      } catch (error) {
        console.error('Error cargando administradores:', error);
      }
    };

    loadAdmins();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios..."
        placeholderTextColor="#999"
      />

       <HeaderRolesNav activeRole="Admin" />

      <Text style={styles.sectionTitle}>Lista de Administradores</Text>
      
      <ScrollView style={styles.listContainer}>
        {admins.map((admin, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listContent}>
              <Text style={styles.listName}>{admin.name || admin.username}</Text>
              <Text style={styles.listId}>ID: {admin.id}</Text>
              <Text style={styles.listId}>Teléfono: {admin.phone}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}
            onPress={() =>
                Alert.alert(
                  'Confirmar eliminación',
                  `¿Seguro que deseas eliminar a ${admin.name}?`,
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Eliminar', style: 'destructive', onPress: () => handleDeleteUser(admin.email) }
                  ]
                )
              }>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* Botón para ir a la pantalla NuevoUsuario */}
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => navigation.navigate('NuevoUsuario')}
      >
        <Icon name="plus" size={18} color="#FFF" style={styles.newButtonIcon} />
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleItem: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  roleActive: {
    backgroundColor: '#f0f0f0',
    borderColor: 'black',
  },
  roleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  listContent: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  listId: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  newButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  newButtonIcon: {
    marginRight: 10,
  },
  newButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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

export default PersonalScreen;
