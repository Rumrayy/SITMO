import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderRolesNav from './HeaderRolesAdmin';
import BottomNavbar from './NavBarAdmin'; // Cambia dinámicamente si lo deseas

const PersonalScreen = () => {
  const navigation = useNavigation();

  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin'); // Cambia esto dinámicamente si deseas otra vista

  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  };

  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('customUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const usersByRole = users
        .filter(u => u.role === selectedRole)
        .map(u => ({
          ...u,
          id: generateRandomId(),
          estado: 'Disponible'
        }));

      setAllUsers(usersByRole);
      setFilteredUsers(usersByRole);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const handleDeleteUser = async (emailToDelete) => {
    try {
      const storedUsers = await AsyncStorage.getItem('customUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const updatedUsers = users.filter(u => u.email !== emailToDelete);
      await AsyncStorage.setItem('customUsers', JSON.stringify(updatedUsers));

      const updatedFiltered = updatedUsers
        .filter(u => u.role === selectedRole)
        .map(u => ({
          ...u,
          id: generateRandomId(),
          estado: 'Disponible'
        }));

      setAllUsers(updatedFiltered);
      setFilteredUsers(updatedFiltered);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      Alert.alert('Error', 'No se pudo eliminar el usuario');
    }
  };

  useEffect(() => {
    loadUsers();
  }, [selectedRole]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(user =>
        (user.name || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (user.username || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (user.phone || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchText, allUsers]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={`Buscar ${selectedRole}s...`}
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />

      <HeaderRolesNav
        activeRole={selectedRole}
        onRoleChange={(role) => {
          setSelectedRole(role);
          setSearchText(''); // limpia el buscador al cambiar de rol
        }}
      />

      <Text style={styles.sectionTitle}>Lista de {selectedRole === 'admin' ? 'Administradores' : selectedRole === 'bodega' ? 'Bodega' : 'Motoristas'}</Text>

      <ScrollView style={styles.listContainer}>
        {filteredUsers.map((user, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listContent}>
              <Text style={styles.listName}>{user.name || user.username}</Text>
              <Text style={styles.listId}>ID: {user.id}</Text>
              <Text style={styles.listId}>Teléfono: {user.phone}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                Alert.alert(
                  'Confirmar eliminación',
                  `¿Seguro que deseas eliminar a ${user.name}?`,
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Eliminar', style: 'destructive', onPress: () => handleDeleteUser(user.email) }
                  ]
                )
              }
            >
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listContainer: { flex: 1, marginBottom: 20 },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  listContent: { flex: 1 },
  listName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  listId: { fontSize: 14, color: '#666' },
  deleteButton: { padding: 8 },
  newButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  newButtonIcon: { marginRight: 10 },
  newButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default PersonalScreen;
