import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const advertencias = [
  { id: '1', titulo: 'Cancelación #1', motivo: 'Cliente no disponible', fecha: '28 Abr 2025' },
  { id: '2', titulo: 'Cancelación #2', motivo: 'Dirección incorrecta', fecha: '27 Abr 2025' },
  { id: '3', titulo: 'Cancelación #3', motivo: 'Pedido duplicado', fecha: '25 Abr 2025' },
  { id: '4', titulo: 'Cancelación #4', motivo: 'Vehículo averiado', fecha: '24 Abr 2025' },
  { id: '5', titulo: 'Cancelación #5', motivo: 'Problemas climáticos', fecha: '23 Abr 2025' },
  { id: '6', titulo: 'Cancelación #6', motivo: 'Cliente canceló el pedido', fecha: '22 Abr 2025' },
  { id: '7', titulo: 'Cancelación #7', motivo: 'Entrega reprogramada por cliente', fecha: '21 Abr 2025' },
  { id: '8', titulo: 'Cancelación #8', motivo: 'Problemas en la ruta de entrega', fecha: '20 Abr 2025' },
];

const AdvertenciaScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardMotivo}>{item.motivo}</Text>
        <Text style={styles.cardFecha}>Fecha: {item.fecha}</Text>
      </View>
      <Icon name="exclamation-triangle" size={24} color="#dc3545" style={{ marginLeft: 10 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={advertencias}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />

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
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721c24',
  },
  cardMotivo: {
    fontSize: 14,
    color: '#721c24',
  },
  cardFecha: {
    fontSize: 12,
    color: '#721c24',
    marginTop: 4,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});

export default AdvertenciaScreen;
