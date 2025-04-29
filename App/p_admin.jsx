import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PersonalScreen = () => {
  const navigation = useNavigation();

  const administradores = [
    { id: '#RP_12345', nombre: 'JUANA PEREZ' },
    { id: '#RP_12542', nombre: 'CARLO PEREZ' },
    { id: '#RP_34521', nombre: 'MARIA MORALES' },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios..."
        placeholderTextColor="#999"
      />

      <View style={styles.rolesContainer}>
        <TouchableOpacity style={[styles.roleItem, styles.roleActive]}>
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleItem}>
          <Text style={styles.roleText}>Motorista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleItem}>
          <Text style={styles.roleText}>Bodega</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Lista de Administradores</Text>
      
      <ScrollView style={styles.listContainer}>
        {administradores.map((admin, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listContent}>
              <Text style={styles.listName}>{admin.nombre}</Text>
              <Text style={styles.listId}>ID: {admin.id}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
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
