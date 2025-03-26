import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

const AdvertenciaScreen = () => {
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
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

export default AdvertenciaScreen;