import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActionSheetIOS, Platform 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FinalizarEntrega = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { invoiceId, setInvoiceDetails, updateDeliveryStatus } = route.params || {};

  const [recipient, setRecipient] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [observations, setObservations] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [image, setImage] = useState(null);

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
    try {
      const storedFacturas = await AsyncStorage.getItem('facturas');
      const parsedFacturas = storedFacturas ? JSON.parse(storedFacturas) : [];

      const updatedFacturas = parsedFacturas.map(f => {
        if (f.id === invoiceId) {
          return {
            ...f,
            recipient,
            deliveryLocation,
            observations,
            issueDescription,
            imagen: image,
            status: 'Entregado', // cambia el estado
          };
        }
        return f;
      });

      await AsyncStorage.setItem('facturas', JSON.stringify(updatedFacturas));

      Alert.alert('Éxito', 'Entrega registrada exitosamente.');
      navigation.navigate('Dashboard'); // o 'DetalleEntrega' si prefieres
    } catch (error) {
      console.error('Error guardando entrega:', error);
      Alert.alert('Error', 'No se pudo guardar la entrega.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Producto entregado a:</Text>
      <TextInput style={styles.input} placeholder="Nombre del receptor" value={recipient} onChangeText={setRecipient} />
      
      <Text style={styles.label}>Lugar de entrega:</Text>
      <TextInput style={styles.input} placeholder="Destino" value={deliveryLocation} onChangeText={setDeliveryLocation} />
      
      <Text style={styles.label}>Observaciones:</Text>
      <TextInput style={styles.input} placeholder="Observaciones o quejas" value={observations} onChangeText={setObservations} />
      
      <Text style={styles.label}>¿Hay algún problema?</Text>
      <TextInput style={styles.input} placeholder="Ingresar problemas encontrados" value={issueDescription} onChangeText={setIssueDescription} />
      
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  imageButton: { backgroundColor: '#ddd', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  imagePreview: { width: 100, height: 100, marginBottom: 10, alignSelf: 'center' },
  submitButton: { backgroundColor: 'black', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
});

export default FinalizarEntrega;
