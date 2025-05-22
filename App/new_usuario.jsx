import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SHA256 from 'crypto-js/sha256';

const NuevoUsuarioScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const formatPhoneNumber = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 4) {
      cleaned = cleaned.slice(0, 4) + '-' + cleaned.slice(4, 8);
    }
    setPhone(cleaned.slice(0, 9));
  };

  const validatePhone = () => {
    const salvadorPhoneRegex = /^(6|7)\d{3}-\d{4}$/;
    if (!salvadorPhoneRegex.test(phone)) {
      Alert.alert('Error', 'El número de teléfono debe estar en formato ####-#### y comenzar con 6 o 7.');
      return false;
    }
    return true;
  };

const handleCreateUser = async () => {
  if (!validatePhone()) return;

  if (!firstName || !lastName || !email || !tempPassword || !role || !username) {
    Alert.alert('Error', 'Por favor completa todos los campos');
    return;
  }

  try {
    const hashedPassword = SHA256(tempPassword).toString();
    const newUser = {
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      username,
      role,
      phone,
      screen:
        role === 'admin'
          ? 'Admin'
          : role === 'bodega'
          ? 'Bodega'
          : role === 'motorista'
          ? 'Dashboard'
          : 'Login',
      pendientes: [],
      realizadas: [],
      entregas: [],
      inconcenientes:[],
    };

    const storedUsers = await AsyncStorage.getItem('customUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const alreadyExists = users.some(u => u.email === email);
    if (alreadyExists) {
      Alert.alert('Error', 'Ya existe un usuario con este correo');
      return;
    }

    users.push(newUser);
    await AsyncStorage.setItem('customUsers', JSON.stringify(users));

    Alert.alert('Éxito', 'Usuario creado exitosamente');
    navigation.goBack();
  } catch (error) {
    console.error('Error creando usuario:', error);
    Alert.alert('Error', 'No se pudo crear el usuario');
  }
};


  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.form}>
            <Text style={styles.label}>Usuario:</Text>
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Nombres:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombres"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Apellidos:</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
              style={styles.input}
              placeholder="####-####"
              value={phone}
              onChangeText={formatPhoneNumber}
              keyboardType="numeric"
              maxLength={9}
            />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Temporal"
              value={tempPassword}
              onChangeText={setTempPassword}
              secureTextEntry
            />

            <Text style={styles.label}>Rol:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona un rol" value="" />
                <Picker.Item label="Administrador" value="admin" />
                <Picker.Item label="Bodega" value="bodega" />
                <Picker.Item label="Motorista" value="motorista" />
              </Picker>
            </View>

            {/* Botones uno debajo del otro */}
            <View style={styles.buttonStack}>
              <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                <Text style={styles.buttonText}>Crear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  input: {
  height: 48, 
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 6,
  paddingHorizontal: 12,
  marginBottom: 12,
  fontSize: 15, 
},

pickerContainer: {
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 6,
  marginBottom: 12,
  overflow: 'hidden',
  height: 55, 
  justifyContent: 'center',
},
picker: {
  height: 50,
  color: '#000', 
},

  buttonStack: {
    marginTop: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default NuevoUsuarioScreen;
