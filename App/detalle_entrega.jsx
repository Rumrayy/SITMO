import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetalleEntrega = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { invoiceId, status: initialStatus } = route.params;
  const [status, setStatus] = useState(initialStatus || 'Pendiente');

  useEffect(() => {
    if (initialStatus) {
      setStatus(initialStatus);
    }
  }, [initialStatus]);

  const iniciarEntrega = () => {
    setStatus('En camino');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Estatus: {status}</Text>
      <TouchableOpacity style={styles.startButton} onPress={iniciarEntrega}>
        <Text style={styles.startButtonText}>Iniciar entrega</Text>
      </TouchableOpacity>
      <MapView style={styles.map}>
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Ubicación" />
      </MapView>
      <View style={styles.invoiceBox}>
        <Text>FACTURA</Text>
      </View>
      <TouchableOpacity 
        style={styles.completeButton}
        onPress={() => navigation.navigate('FinalizarEntrega', { invoiceId })}
      >
        <Text style={styles.buttonText}>Finalizar entrega</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.errorButton}
        onPress={() => navigation.navigate('ErrorEntrega', { invoiceId })}
      >
        <Text style={styles.buttonText}>Error de entrega</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  status: { fontSize: 16, marginVertical: 10 },
  startButton: { backgroundColor: 'black', padding: 15, marginTop: 20, width: '90%', alignItems: 'center', borderRadius: 5 },
  completeButton: { backgroundColor: 'white', padding: 15, marginTop: 10, width: '90%', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'black' },
  errorButton: { backgroundColor: 'white', padding: 15, marginTop: 10, width: '90%', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'black' },
  buttonText: { color: 'black', fontWeight: 'bold' },
  startButtonText: { color: 'white', fontWeight: 'bold' },
  map: { width: '100%', height: 200, marginTop: 20 },
  invoiceBox: { padding: 10, backgroundColor: '#eee', marginTop: 10, width: '90%', alignItems: 'center' },
  backButton: { position: 'absolute', top: 40, left: 20 },
});

export default DetalleEntrega;
