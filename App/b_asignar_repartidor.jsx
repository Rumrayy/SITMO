import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, ToastAndroid 
} from 'react-native';

const repartidores = [
  { id: '1', nombre: 'Juan Pérez', codigo: '#REP-12345', direccion: 'San Salvador', zona: 'Centro Histórico', disponible: true, imagen: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' } },
  { id: '2', nombre: 'Maria Morales', codigo: '#REP-34512', direccion: 'Santa Tecla', zona: 'Zona Rosa', disponible: false, imagen: { uri: 'https://randomuser.me/api/portraits/women/2.jpg' } },
  { id: '3', nombre: 'Judith Guerra', codigo: '#REP-45785', direccion: 'Soyapango', zona: 'Plaza Mundo', disponible: true, imagen: { uri: 'https://randomuser.me/api/portraits/women/3.jpg' } },
];

const AsignarRepartidorScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRepartidor, setSelectedRepartidor] = useState(null);

  const handleSelectRepartidor = (repartidor) => {
    if (!repartidor.disponible) return; // Evitar selección de repartidores no disponibles
    setSelectedRepartidor(repartidor);
    setModalVisible(true);
  };

  const confirmAssignment = () => {
    setModalVisible(false);
    ToastAndroid.show('Asignado correctamente', ToastAndroid.SHORT);
    
    // Redirigir a la pantalla de facturas después de la asignación
    setTimeout(() => {
      navigation.navigate('Facturas');
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => handleSelectRepartidor(item)} 
      style={[styles.card, !item.disponible && styles.disabledCard]}
      disabled={!item.disponible}
    >
      <Image source={item.imagen} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.details}>{item.codigo}</Text>
        <Text style={styles.details}>{item.direccion}</Text>
        <Text style={styles.details}>{item.zona}</Text>
        <Text style={[styles.status, item.disponible ? styles.available : styles.unavailable]}>
          {item.disponible ? 'Disponible' : 'No disponible'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate('Mapa', { direccion: item.direccion })}
      >
        <Text style={styles.mapButtonText}>Ver en mapa</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={repartidores}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Modal de Confirmación */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Asignación</Text>
            {selectedRepartidor && (
              <Text style={styles.modalText}>¿Asignar a {selectedRepartidor.nombre}?</Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmAssignment}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  disabledCard: {
    backgroundColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  details: {
    fontSize: 12,
    color: '#555',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  available: {
    color: 'green',
  },
  unavailable: {
    color: 'red',
  },
  mapButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 12,
  },

  // Estilos del Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AsignarRepartidorScreen;
