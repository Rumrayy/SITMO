import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const facturas = [
  { id: '1', titulo: 'Factura #1', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '2', titulo: 'Factura #2', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '3', titulo: 'Factura #3', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
  { id: '4', titulo: 'Factura #4', descripcion: 'Descripción', fechaEntrega: '15 Feb 2025' },
];

const BodegaScreen = () => {
  const navigation = useNavigation();

  const handleEdit = (factura) => {
    navigation.navigate('EditarFactura', { factura });
  };

  const handleDelete = (id) => {
    Alert.alert('Eliminar', '¿Deseas eliminar esta factura?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => console.log(`Factura ${id} eliminada`) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardDescription}>{item.descripcion}</Text>
        <Text style={styles.cardDate}>Entrega: {item.fechaEntrega}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon name="edit" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 15 }}>
          <Icon name="trash" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NuevaFactura')}
        >
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.addButtonText}> Nueva Factura</Text>
        </TouchableOpacity>

        <FlatList
          data={facturas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Admin')}>
          <Icon name="home" size={24} color="black" />
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Personal')}>
          <Icon name="users" size={24} color="black" />
          <Text style={styles.menuText}>Personal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Bodega')}>
          <Icon name="truck" size={24} color="black" />
          <Text style={styles.menuText}>Bodega</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Advertencia')}>
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
    marginTop: 50,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  cardActions: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
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

export default BodegaScreen;
