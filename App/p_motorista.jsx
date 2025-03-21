import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PersonalMotoristaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios..."
        placeholderTextColor="#999"
      />

      <View style={styles.rolesContainer}>
        <Text style={styles.roleItem}>Admin</Text>
        <Text style={styles.roleItem}>Motorista</Text>
        <Text style={styles.roleItem}>Bodega</Text>
      </View>

      <Text style={styles.sectionTitle}>Lista de Motoristas</Text>
      <ScrollView style={styles.listContainer}>
        {/* Motorista 1 */}
        <View style={styles.motoristaItem}>
          <View style={styles.nameStatusContainer}>
            <Text style={styles.motoristaName}>Juana Pérez</Text>
            <Text style={styles.motoristaStatus}>Disponible</Text>
          </View>
          <Text style={styles.motoristaId}>ID: #RP_12345</Text>
          <Text style={styles.motoristaId}>Descripcion</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Entregas Hoy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>25 min</Text>
              <Text style={styles.statLabel}>Tiempo Promedio</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.locationButton}>
              <Icon name="map-marker" size={16} color="#fff" />
              <Text style={styles.locationButtonText}>Ver Ubicación</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.motoristaItem}>
          <View style={styles.nameStatusContainer}>
            <Text style={styles.motoristaName}>Carlo Pérez</Text>
            <Text style={styles.motoristaStatus}>En entrega</Text>
          </View>
          <Text style={styles.motoristaId}>ID: #RP_12345</Text>
          <Text style={styles.motoristaId}>Descripcion</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>Entregas Hoy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>30 min</Text>
              <Text style={styles.statLabel}>Tiempo Promedio</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.locationButton}>
              <Icon name="map-marker" size={16} color="#fff" />
              <Text style={styles.locationButtonText}>Ver Ubicación</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.newButton}>
                <Text style={styles.newButtonText}>Nuevo</Text>
              </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomMenu}>
        <Icon name="home" size={24} color="black" />
        <Icon name="users" size={24} color="black" />
        <Icon name="truck" size={24} color="black" />
        <Icon name="exclamation-triangle" size={24} color="black" />
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 20,
  },
  motoristaItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  nameStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  motoristaName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  motoristaStatus: {
    fontSize: 14,
    color: '#007BFF',
    
  },
  motoristaId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6668', 
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  actionButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  newButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  newButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
});

export default PersonalMotoristaScreen;