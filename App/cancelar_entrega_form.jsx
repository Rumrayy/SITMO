import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActionSheetIOS, Platform 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ErrorEntrega = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { invoiceId, setInvoiceDetails, updateDeliveryStatus } = route.params || {};

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const issues = [
    'Punto de entrega cerrado',
    'Accidente o inconvenientes del transporte',
    'Devolución del pedido',
    'Nadie recibió el pedido',
    'Otro',
  ];

  const handleImageSelection = async () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Tomar Foto', 'Elegir de la Galería', 'Cancelar'],
          cancelButtonIndex: 2,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) await takePhoto();
          else if (buttonIndex === 1) await pickImage();
        }
      );
    } else {
      Alert.alert('Seleccionar imagen', '¿Desde dónde quieres seleccionar la imagen?', [
        { text: 'Cámara', onPress: takePhoto },
        { text: 'Galería', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' },
      ]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara para tomar fotos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!selectedIssue || !description) {
      Alert.alert('Error', 'Debe seleccionar un inconveniente y agregar una descripción.');
      return;
    }

    try {
      // Actualizar factura con estado "Inconveniente"
      const stored = await AsyncStorage.getItem('facturas');
      const facturas = stored ? JSON.parse(stored) : [];

      const actualizadas = facturas.map(f => {
        if (f.id === invoiceId) {
          return {
            ...f,
            status: 'Inconveniente',
            errorInfo: {
              issue: selectedIssue,
              description,
              image,
              date: new Date().toLocaleDateString(),
            }
          };
        }
        return f;
      });

      await AsyncStorage.setItem('facturas', JSON.stringify(actualizadas));

      // Guardar advertencia para la pantalla de advertencias
      const advertencia = {
        id: Date.now().toString(),
        titulo: `Cancelación #${invoiceId}`,
        motivo: selectedIssue,
        fecha: new Date().toLocaleDateString(),
      };

      const savedWarnings = await AsyncStorage.getItem('advertencias');
      const parsedWarnings = savedWarnings ? JSON.parse(savedWarnings) : [];

      const nuevasAdvertencias = [...parsedWarnings, advertencia];
      await AsyncStorage.setItem('advertencias', JSON.stringify(nuevasAdvertencias));

      Alert.alert('Inconveniente registrado', 'Se ha guardado la información.');
      navigation.navigate('Dashboard', { invoiceId, status: 'Inconveniente' });
    } catch (error) {
      console.error('Error al guardar inconveniente:', error);
      Alert.alert('Error', 'No se pudo guardar el inconveniente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>¿Cuál fue el inconveniente?</Text>
      {issues.map((issue, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.option, selectedIssue === issue && styles.selectedOption]} 
          onPress={() => setSelectedIssue(issue)}
        >
          <Text style={selectedIssue === issue ? styles.selectedText : styles.optionText}>{issue}</Text>
        </TouchableOpacity>
      ))}
      
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción corta del inconveniente"
        value={description}
        onChangeText={setDescription}
      />
      
      <TouchableOpacity style={styles.imageButton} onPress={handleImageSelection}>
        <Text>Agregar foto</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar y Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  option: { padding: 10, marginVertical: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  selectedOption: { backgroundColor: '#ddd' },
  optionText: { fontSize: 14 },
  selectedText: { fontSize: 14, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  imageButton: { backgroundColor: '#ddd', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  imagePreview: { width: 100, height: 100, marginBottom: 10, alignSelf: 'center' },
  submitButton: { backgroundColor: 'black', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
});

export default ErrorEntrega;
