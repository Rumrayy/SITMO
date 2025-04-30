import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

const AlertasScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advertencias</Text>
      
      {/* Contenido principal de la pantalla */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Lista de advertencias</Text>
        {/* Aquí puedes agregar tu lista de advertencias */}
      </View>

      
      
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
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