import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../App/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';

// 1. Define el tipo para las rutas (debe coincidir con tu RootStackParamList principal)
type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
  Personal: undefined;
  Bodega: undefined;
  Advertencia: undefined;
  // Agrega aquí todas las rutas que uses en tu navegación
};

// 2. Crea el tipo para la navegación
type BottomNavbarNavigationProp = StackNavigationProp<RootStackParamList>;

const BottomNavbar = () => {
  // 3. Tipa el hook useNavigation
  const navigation = useNavigation<BottomNavbarNavigationProp>();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout(); 
      navigation.navigate("Login");
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
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
        <Text style={styles.menuText}>Alertas</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={handleLogout}
      >
        <Icon name="sign-out" size={24} color="#d11a2a" />
        <Text style={[styles.menuText, { color: '#d11a2a' }]}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 4,
  },
});

export default BottomNavbar;
