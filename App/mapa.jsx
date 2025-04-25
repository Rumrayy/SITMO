import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const defaultCoordinates = {
  latitude: 13.69294, // San Salvador, El Salvador
  longitude: -89.21819,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = ({ route }) => {
  const [coordinates, setCoordinates] = useState(defaultCoordinates);

  useEffect(() => {
    if (route?.params?.direccion) {
      console.log(`Dirección recibida: ${route.params.direccion}`);

      // Aquí puedes agregar la lógica para obtener coordenadas reales de la dirección en El Salvador
      // Ejemplo con Google Maps API (requiere API key válida):
      /*
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(route.params.direccion)},+El+Salvador&key=YOUR_GOOGLE_MAPS_API_KEY`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setCoordinates({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
        })
        .catch(error => console.log(error));
      */
    }
  }, [route?.params?.direccion]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicación del Repartidor</Text>
      <MapView
        style={styles.map}
        initialRegion={coordinates}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        <Marker coordinate={coordinates} title="Repartidor" description={route?.params?.direccion || 'Ubicación desconocida'} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});

export default MapScreen;
