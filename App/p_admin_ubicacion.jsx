import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationComponent = () => {
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
      {location ? (
        <Text style={styles.text}>
          Latitud: {location.latitude}, Longitud: {location.longitude}
        </Text>
      ) : (
        <Text style={styles.text}>Cargando ubicación...</Text>
      )}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default LocationComponent;