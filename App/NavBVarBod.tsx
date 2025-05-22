import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from './AuthContext';

// 1. Define el tipo para las rutas (debe coincidir con tu RootStackParamList principal)
type RootStackParamList = {
  Login: undefined;
  Facturas: undefined;
  FacturaDetalle: undefined;
  Advertencia: undefined;
  // Agrega aquí todas las rutas que uses en tu navegación
};

// 2. Crea el tipo para la navegación
type BottomNavbarCustomNavigationProp = StackNavigationProp<RootStackParamList>;

const BottomNavbarCustom = () => {
  // 3. Tipa el hook useNavigation
  const navigation = useNavigation<BottomNavbarCustomNavigationProp>();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout(); 
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity 
        style={styles.menuItem} 
        onPress={() => navigation.navigate('Facturas')}
      >
        <Icon name="home" size={24} color="black" />
        <Text style={styles.menuText}>Inicio</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.menuItem} 
        onPress={() => navigation.navigate('Advertencia')}
      >
        <Icon name="exclamation-triangle" size={24} color="black" />
        <Text style={styles.menuText}>Advertencias</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem} 
        onPress={handleLogout}
      >
        <Icon name="sign-out" size={24} color="black" />
        <Text style={styles.menuText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos (se mantienen igual)
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