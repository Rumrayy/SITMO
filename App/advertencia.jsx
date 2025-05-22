import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBarAdinBog from './NavBarAdminBog';

const AdvertenciaScreen = () => {
  const [advertencias, setAdvertencias] = useState([]);

  useEffect(() => {
    cargarAdvertencias();
  }, []);

  const cargarAdvertencias = async () => {
    try {
      const json = await AsyncStorage.getItem('advertencias');
      const advertenciasGuardadas = json ? JSON.parse(json) : [];

      setAdvertencias(advertenciasGuardadas);

    } catch (error) {
      console.error('Error cargando advertencias del almacenamiento:', error);
    }
  };

  const guardarAdvertenciaAutoId = async (titulo, motivo, fecha) => {
    try {
      const data = await AsyncStorage.getItem('advertencias');
      const advertenciasAlmacenadas = data ? JSON.parse(data) : [];

      const allAdvertencias = [...advertenciasMock, ...advertenciasAlmacenadas];
      const maxId = allAdvertencias.reduce((max, adv) => {
        const idNum = parseInt(adv.id);
        return idNum > max ? idNum : max;
      }, 0);
      const nuevoId = (maxId + 1).toString();

      const nuevaAdvertencia = {
        id: nuevoId,
        titulo,
        motivo,
        fecha,
      };

      const nuevasAdvertencias = [...advertenciasAlmacenadas, nuevaAdvertencia];
      await AsyncStorage.setItem('advertencias', JSON.stringify(nuevasAdvertencias));
      setAdvertencias((prev) => [...prev, nuevaAdvertencia]);
      console.log('Advertencia guardada con ID', nuevoId);
    } catch (error) {
      console.error('Error guardando advertencia:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardMotivo}>{item.motivo}</Text>
        <Text style={styles.cardFecha}>Fecha: {item.fecha}</Text>
      </View>
      <Icon name="exclamation-triangle" size={24} color="#dc3545" style={{ marginLeft: 10 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={advertencias}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      />


      <NavBarAdinBog />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721c24',
  },
  cardMotivo: {
    fontSize: 14,
    color: '#721c24',
  },
  cardFecha: {
    fontSize: 12,
    color: '#721c24',
    marginTop: 4,
  },
});

export default AdvertenciaScreen;
