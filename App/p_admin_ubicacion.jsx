import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const hasPermission = await Geolocation.requestAuthorization('whenInUse');

        if (hasPermission) {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation(position.coords);
            },
            (error) => {
              setError(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicación Actual</Text>

      <View style={styles.content}>
        {location ? (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              <Text style={styles.label}>Latitud:</Text> {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              <Text style={styles.label}>Longitud:</Text> {location.longitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              <Text style={styles.label}>Precisión:</Text> {location.accuracy} metros
            </Text>
          </View>
        ) : (
          <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
        )}
        
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
      </View>

      {/* Footer de navegación */}
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
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
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

export default LocationScreen;