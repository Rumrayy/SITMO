import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const AlertasScreen = () => {
  const navigation = useNavigation();

  // Datos de alertas
  const alertas = [
    {
      id: 1241,
      problema: "Mercancía incompleta",
      detalles: "Faltan 2 cajas del pedido original. Cliente reportó faltante al momento de la entrega."
    },
    {
      id: 15,
      problema: "Daño en mercancía",
      detalles: "Faltan 2 cajas del pedido original. Cliente reportó faltante al momento de la entrega."
    }
  ];

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.alertContainer}>
        {alertas.map((alerta) => (
          <View key={alerta.id} style={styles.alertCard}>
            <Text style={styles.alertTitle}>Entrega #{alerta.id}</Text>
            <Text style={styles.alertProblem}>Problema: {alerta.problema}</Text>
            <Text style={styles.alertDetails}>Detalles: {alerta.detalles}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Admin')}
        >
          <Icon name="home" size={24} color="#333" />
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Personal')}
        >
          <Icon name="users" size={24} color="#333" />
          <Text style={styles.menuText}>Personal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Facturas')}
        >
          <Icon name="truck" size={24} color="#333" />
          <Text style={styles.menuText}>Bodega</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Advertencia')}
        >
          <Icon name="exclamation-triangle" size={24} color="#0066cc" />
          <Text style={[styles.menuText, { color: '#0066cc' }]}>Alertas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  alertContainer: {
    flex: 1,
    padding: 15,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  alertProblem: {
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 8,
  },
  alertDetails: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});

export default AlertasScreen;