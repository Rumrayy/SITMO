import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext';

const BottomNavbarCustom = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
const handleLogout = async () => {
  try {
    logout(); 
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Bodega')}>
        <Icon name="home" size={24} color="black" />
        <Text style={styles.menuText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FacturaDetalle')}>
        <Icon name="truck" size={24} color="black" />
        <Text style={styles.menuText}>Facturas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Advertencia')}>
        <Icon name="exclamation-triangle" size={24} color="black" />
        <Text style={styles.menuText}>Advertencias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="black" />
        <Text style={styles.menuText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
    color: 'black',
  },
});

export default BottomNavbarCustom;
