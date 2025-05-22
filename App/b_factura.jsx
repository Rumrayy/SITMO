import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavbar from './NavBVarBod';
import { AuthContext } from '../App/AuthContext';

const FacturasScreen = ({ navigation }) => {
  const [facturas, setFacturas] = useState([]);
  const { user } = useContext(AuthContext);
  const showFooter = user?.IdRol === 'Bodega';

  useEffect(() => {
    const cargarFacturas = async () => {
      try {
        const storedFacturas = await AsyncStorage.getItem('facturas');
        const parsedFacturas = storedFacturas ? JSON.parse(storedFacturas) : [];
        setFacturas(parsedFacturas);
      } catch (error) {
        console.error('Error al cargar las facturas desde AsyncStorage:', error);
      }
    };

    cargarFacturas();
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


  return (
    <View style={styles.container}>
      <FlatList
        data={facturas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={showFooter ? styles.listContentAdmin : styles.listContent}
      />
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  listContent: { padding: 15 },
  listContentAdmin: { padding: 15, paddingBottom: 70 },
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
  title: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', marginBottom: 5 },
  date: { fontSize: 12, color: '#999' },
});

export default FacturasScreen;
