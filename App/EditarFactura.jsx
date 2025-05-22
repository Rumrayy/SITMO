import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBarAdmin from '../App/NavBarAdmin';

const EditarFactura = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { factura } = route.params;

  const [empresas, setEmpresas] = useState([]);
  const [formData, setFormData] = useState({
    pedido: factura.pedido,
    ubicacion: factura.ubicacion,
    interno: factura.interno,
    empresaSeleccionada: factura.empresa,
    fechaEntrega: factura.fechaEntrega || ''
  });

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const storedFacturas = await AsyncStorage.getItem('facturas');
        const parsed = storedFacturas ? JSON.parse(storedFacturas) : [];
        const empresasUnicas = [...new Set(parsed.map(f => f.empresa))].map(e => ({ nombre: e }));
        setEmpresas(empresasUnicas);
      } catch (error) {
        console.error('Error cargando empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  const guardarCambios = async () => {
    if (!formData.pedido.trim() || !formData.ubicacion.trim() || !formData.interno.trim() || !formData.empresaSeleccionada) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const storedFacturas = await AsyncStorage.getItem('facturas');
      const parsedFacturas = storedFacturas ? JSON.parse(storedFacturas) : [];

      const nuevasFacturas = parsedFacturas.map(f =>
        f.id === factura.id
          ? {
              ...f,
              titulo: `Factura #${formData.pedido}`,
              descripcion: `Interno: ${formData.interno} - Ubicación: ${formData.ubicacion}`,
              empresa: formData.empresaSeleccionada,
              pedido: formData.pedido,
              interno: formData.interno,
              ubicacion: formData.ubicacion,
              fechaEntrega: formData.fechaEntrega
            }
          : f
      );

      await AsyncStorage.setItem('facturas', JSON.stringify(nuevasFacturas));

      Alert.alert('Éxito', 'Factura actualizada correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error al guardar la factura editada:', error);
      Alert.alert('Error', 'No se pudo guardar la factura.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Editar Factura</Text>
          <TextInput
            style={styles.input}
            placeholder="Número del pedido"
            keyboardType="numeric"
            value={formData.pedido}
            onChangeText={(text) => setFormData({ ...formData, pedido: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ubicación"
            value={formData.ubicacion}
            onChangeText={(text) => setFormData({ ...formData, ubicacion: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="N° Interno"
            keyboardType="numeric"
            value={formData.interno}
            onChangeText={(text) => setFormData({ ...formData, interno: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha de entrega (ej. 2025-06-15)"
            value={formData.fechaEntrega}
            onChangeText={(text) => setFormData({ ...formData, fechaEntrega: text })}
          />
          <Picker
            selectedValue={formData.empresaSeleccionada}
            style={styles.picker}
            onValueChange={(itemValue) => setFormData({ ...formData, empresaSeleccionada: itemValue })}
          >
            <Picker.Item label="Seleccione una empresa" value="" />
            {empresas.map((emp, index) => (
              <Picker.Item key={index} label={emp.nombre} value={emp.nombre} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.button} onPress={guardarCambios}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer fijo abajo */}
      <View style={styles.footer}>
        <NavBarAdmin />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 100, // espacio para el footer
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '90%',
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 55,
    width: '90%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default EditarFactura;
