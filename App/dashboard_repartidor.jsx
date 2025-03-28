import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000);

const invoices = [
  { id: '1', title: `Factura ${generateRandomNumber()}`, status: 'Completado', direccion: 'San Salvador' },
  { id: '2', title: `Factura ${generateRandomNumber()}`, status: 'En proceso', direccion: 'Santa Tecla' },
  { id: '3', title: `Factura ${generateRandomNumber()}`, status: 'Pendiente', direccion: 'Soyapango' },
];

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Facturas Realizadas</Text>
          <Text style={styles.statNumber}>25</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Facturas Pendientes</Text>
          <Text style={styles.statNumber}>5</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Lista de Facturas</Text>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.invoiceCard}>
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceTitle}>{item.title}</Text>
              <Text>{item.status}</Text>
            </View>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('DetalleEntrega', { factura: item })}
            >
              <Text style={styles.detailsButtonText}>Detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  invoiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  invoiceInfo: { flex: 1 },
  invoiceTitle: { fontWeight: 'bold', fontSize: 16 },
  detailsButton: { backgroundColor: '#000', padding: 8, borderRadius: 5 },
  detailsButtonText: { color: '#fff' },
});

export default Dashboard;
