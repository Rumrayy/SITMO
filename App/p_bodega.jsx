import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PersonalbodegaScreen = () => {
  
  const trabajadores = [
    {
      id: '#RP_12345',
      nombre: 'JUANA PEREZ',
    },
    {
      id: '#RP_12542',
      nombre: 'CARLO PEREZ',
    },
    {
      id: '#RP_34521',
      nombre: 'MARIA MORALES',
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
        <Text style={styles.roleItem}>Admin</Text>
        <Text style={styles.roleItem}>Motorista</Text>
        <Text style={styles.roleItem}>Bodega</Text>
      </View>

      <Text style={styles.sectionTitle}>Lista de trabajadores en Bodega</Text>
      <ScrollView style={styles.listContainer}>
       
        {trabajadores.map((trabajador, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listContent}>
              <Text style={styles.listName}>{trabajador.nombre}</Text>
              <Text style={styles.listId}>{trabajador.id}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.newButton}>
        <Text style={styles.newButtonText}>Nuevo</Text>
      </TouchableOpacity>

      <View style={styles.bottomMenu}>
        <Icon name="home" size={24} color="black" />
        <Icon name="users" size={24} color="black" />
        <Icon name="truck" size={24} color="black" />
        <Icon name="exclamation-triangle" size={24} color="black" />
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
    marginTop: 50,
    marginBottom: 20,
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
  },
  listId: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
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
});

export default PersonalbodegaScreen;