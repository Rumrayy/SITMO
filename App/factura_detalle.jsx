import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const FacturaDetalleScreen = ({ route, navigation }) => {
  // Extraemos los parámetros con valores por defecto para evitar errores
  const {
    factura = {},
    direccion = "Dirección no disponible",
    ubicacionCliente = {},
  } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Factura</Text>

      {/* Espacio para mostrar la imagen de la factura */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: factura.imagen || "https://via.placeholder.com/300x200",
          }}
          style={styles.image}
        />
      </View>

      {/* Información de la entrega */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Detalles</Text>
        <Text style={styles.detailsText}>Información de la entrega</Text>
        <Text style={styles.detailsText}>Fecha aceptada: {factura.fechaEntrega || "N/A"}</Text>
        <Text style={styles.detailsText}>Destino: {direccion}</Text>
      </View>

      {/* Mapa solo si la ubicación está disponible */}
      {ubicacionCliente.latitude && ubicacionCliente.longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: ubicacionCliente.latitude,
            longitude: ubicacionCliente.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={ubicacionCliente} title="Ubicación del Cliente" />
        </MapView>
      ) : (
        <Text style={styles.errorText}>Ubicación no disponible</Text>
      )}

      {/* Botón para asignar repartidor */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AsignarRepartidor", { factura })}
      >
        <Text style={styles.buttonText}>Asignar Repartidor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  imageContainer: { alignItems: "center", marginBottom: 10 },
  image: { width: 300, height: 200, borderRadius: 10 },
  detailsContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailsTitle: { fontSize: 16, fontWeight: "bold" },
  detailsText: { fontSize: 14, marginTop: 5 },
  map: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  errorText: { textAlign: "center", color: "red", marginVertical: 10 },
});

export default FacturaDetalleScreen;
