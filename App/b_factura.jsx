import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavbar from './NavBarAdmin';

const facturas = [
  { id: '1', titulo: 'Factura #1', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '2', titulo: 'Factura #2', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '3', titulo: 'Factura #3', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '4', titulo: 'Factura #4', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
];

const FacturasScreen = ({ navigation, route }) => {
  const [userRole, setUserRole] = useState('bodega'); 

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        if (role) {
          setUserRole(role.toLowerCase()); 
        }
      } catch (error) {
        console.error('Error al obtener el rol:', error);
      }
    };

    getUserRole();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FacturaDetalle', { factura: item })}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>
      <Text style={styles.date}>Fecha de entrega: {item.fechaEntrega}</Text>
    </TouchableOpacity>
  );


  const showFooter = ['admin', 'bodega'].includes(userRole);

  return (
    <View style={styles.container}>
      <FlatList
        data={facturas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={showFooter ? styles.listContentAdmin : styles.listContent}
      />
      
      <BottomNavbar />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listContent: {
    padding: 15,
  },
  listContentAdmin: {
    padding: 15,
    paddingBottom: 70, // Espacio para el footer solo cuando es admin
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    alignItems: 'center',
  },
  activeMenuItem: {
    // Estilo para el ítem activo
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
  activeMenuText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default FacturasScreen;