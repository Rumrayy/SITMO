import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const facturas = [
  { id: '1', titulo: 'Factura #1', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '2', titulo: 'Factura #2', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '3', titulo: 'Factura #3', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '4', titulo: 'Factura #4', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
];

const FacturasScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FacturaDetalle', { factura: item })}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>
      <Text style={styles.date}>Fecha de entrega: {item.fechaEntrega}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bodega</Text>
      <FlatList
        data={facturas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default FacturasScreen;
