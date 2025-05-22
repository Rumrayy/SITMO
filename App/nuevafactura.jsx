import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const IngresoEmpresa = () => {
  const navigation = useNavigation();
  const [empresaData, setEmpresaData] = useState({ nombre: '', ruta: '' });
  const [empresas, setEmpresas] = useState([]);
 const [facturas, setFacturas] = useState([]);
 const [factura, setFactura] = useState({
  pedido: '',
  ubicacion: '',
  interno: '',
  empresaSeleccionada: ''
});


useEffect(() => {
  const fetchFacturas = async () => {
    try {
      const storedFacturas = await AsyncStorage.getItem('facturas');
      const parsed = storedFacturas ? JSON.parse(storedFacturas) : [];
      setFacturas(parsed);
    } catch (error) {
      console.error('Error cargando facturas:', error);
    }
  };

  const unsubscribe = navigation.addListener('focus', fetchFacturas);
  return unsubscribe;
}, [navigation]);

  const agregarEmpresa = () => {
    if (!empresaData.nombre.trim() || !empresaData.ruta.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    setEmpresas([...empresas, { ...empresaData }]);
    setEmpresaData({ nombre: '', ruta: '' });
    Alert.alert('Éxito', 'Empresa agregada correctamente.');
  };

  const agregarFactura = async () => {
    if (!factura.pedido.trim() || !factura.ubicacion.trim() || !factura.interno.trim() || !factura.empresaSeleccionada) {
      Alert.alert('Error', 'Todos los campos de la factura son obligatorios.');
      return;
    }
    try {
  const storedFacturas = await AsyncStorage.getItem('facturas');
  const parsedFacturas = storedFacturas ? JSON.parse(storedFacturas) : [];

  const nuevaFactura = {
    id: Date.now().toString(),
    titulo: `Factura #${factura.pedido}`,
    descripcion: `Interno: ${factura.interno} - Ubicación: ${factura.ubicacion}`,
    fechaEntrega: new Date().toLocaleDateString(),
    empresa: factura.empresaSeleccionada
  };

  parsedFacturas.push(nuevaFactura);
  await AsyncStorage.setItem('facturas', JSON.stringify(parsedFacturas));

  Alert.alert('Éxito', 'Factura agregada correctamente.');
  setFactura({ pedido: '', ubicacion: '', interno: '', empresaSeleccionada: '' });
} catch (error) {
  Alert.alert('Error', 'No se pudo guardar la factura.');
  console.error(error);
}

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingreso de Empresa</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa"
        value={empresaData.nombre}
        onChangeText={(text) => setEmpresaData({ ...empresaData, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ruta"
        value={empresaData.ruta}
        onChangeText={(text) => setEmpresaData({ ...empresaData, ruta: text })}
      />
      <TouchableOpacity style={styles.button} onPress={agregarEmpresa}>
        <Text style={styles.buttonText}>Agregar Empresa</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Agregar Factura</Text>
      <TextInput
        style={styles.input}
        placeholder="Numero del pedido"
        keyboardType="numeric"
        value={factura.pedido}
        onChangeText={(text) => setFactura({ ...factura, pedido: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={factura.ubicacion}
        onChangeText={(text) => setFactura({ ...factura, ubicacion: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="N° Interno"
        keyboardType="numeric"
        value={factura.interno}
        onChangeText={(text) => setFactura({ ...factura, interno: text })}
      />
      <Picker
        selectedValue={factura.empresaSeleccionada}
        style={styles.picker}
        onValueChange={(itemValue) => setFactura({ ...factura, empresaSeleccionada: itemValue })}
        enabled={empresas.length > 0} 
      >
        <Picker.Item label="Seleccione una empresa" value="" />
        {empresas.map((emp, index) => (
          <Picker.Item key={index} label={emp.nombre} value={emp.nombre} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={agregarFactura}>
        <Text style={styles.buttonText}>Agregar Factura</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, width: '90%', marginBottom: 10, borderRadius: 5 },
  picker: { height: 55, width: '90%', marginBottom: 10 },
  button: { backgroundColor: 'black', padding: 15, marginTop: 10, width: '90%', alignItems: 'center', borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default IngresoEmpresa;
