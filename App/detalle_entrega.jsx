import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetalleEntrega = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { invoiceId } = route.params;

  const [status, setStatus] = useState('Pendiente');
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    const loadFactura = async () => {
      try {
        const stored = await AsyncStorage.getItem('facturas');
        const facturas = stored ? JSON.parse(stored) : [];

        const actual = facturas.find(f => f.id === invoiceId);
        if (actual) {
          setFactura(actual);
          setStatus(actual.status || 'Pendiente');
        }
      } catch (e) {
        console.error('Error cargando factura:', e);
      }
    };
    loadFactura();
  }, [invoiceId]);

  const actualizarEstado = async (nuevoEstado) => {
    try {
      const stored = await AsyncStorage.getItem('facturas');
      const facturas = stored ? JSON.parse(stored) : [];

      const actualizadas = facturas.map(f =>
        f.id === invoiceId ? { ...f, status: nuevoEstado } : f
      );

      await AsyncStorage.setItem('facturas', JSON.stringify(actualizadas));
      setStatus(nuevoEstado);
    } catch (e) {
      console.error('Error actualizando factura:', e);
    }
  };

  const iniciarEntrega = () => {
    actualizarEstado('En camino');
  };

  const finalizarEntrega = () => {
    navigation.navigate('FinalizarEntrega', { invoiceId });
  };

  const reportarError = () => {
    navigation.navigate('ErrorEntrega', { invoiceId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Estatus: {status}</Text>

      <TouchableOpacity style={styles.startButton} onPress={iniciarEntrega}>
        <Text style={styles.startButtonText}>Iniciar entrega</Text>
      </TouchableOpacity>

      <MapView style={styles.map}>
        <Marker
          coordinate={{
            latitude: factura?.lat || 13.702,
            longitude: factura?.lng || -89.220,
          }}
          title="Destino"
        />
      </MapView>

      <View style={styles.invoiceBox}>
        <Text style={styles.invoiceTitle}>{factura?.titulo || 'Factura sin título'}</Text>
        <Text>{factura?.descripcion || 'Sin descripción'}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.completeButton,
          status !== 'En camino' && { opacity: 0.4 }
        ]}
        disabled={status !== 'En camino'}
        onPress={finalizarEntrega}
      >
        <Text style={styles.buttonText}>Finalizar entrega</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.errorButton} onPress={reportarError}>
        <Text style={styles.buttonText}>Error de entrega</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  status: { fontSize: 18, marginVertical: 10, fontWeight: 'bold' },
  startButton: {
    backgroundColor: 'black',
    padding: 15,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5
  },
  completeButton: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  errorButton: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonText: { color: 'black', fontWeight: 'bold' },
  startButtonText: { color: 'white', fontWeight: 'bold' },
  map: { width: '100%', height: 200, marginTop: 20 },
  invoiceBox: {
    padding: 10,
    backgroundColor: '#eee',
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default DetalleEntrega;
