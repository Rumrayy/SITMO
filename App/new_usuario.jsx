import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const NuevoUsuarioScreen = () => {
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

  const handleCreateUser = () => {
    if (!validatePhone()) {
      return;
    }
    console.log('Usuario creado:', { firstName, lastName, email, tempPassword, role, username, phone });
    Alert.alert('Éxito', 'Usuario creado exitosamente');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.form}>
            <Text style={styles.label}>Nombre de usuario:</Text>
            <TextInput style={styles.input} placeholder="Enter username" value={username} onChangeText={setUsername} />

            <Text style={styles.label}>Nombres:</Text>
            <TextInput style={styles.input} placeholder="Enter first name" value={firstName} onChangeText={setFirstName} />

            <Text style={styles.label}>Apellidos:</Text>
            <TextInput style={styles.input} placeholder="Enter last name" value={lastName} onChangeText={setLastName} />

            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} placeholder="Enter email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

            <Text style={styles.label}>Teléfono:</Text>
            <TextInput style={styles.input} placeholder="####-####" value={phone} onChangeText={formatPhoneNumber} keyboardType="numeric" maxLength={9} />

            <Text style={styles.label}>Contraseña temporal:</Text>
            <TextInput style={styles.input} placeholder="Enter temporary password" value={tempPassword} onChangeText={setTempPassword} secureTextEntry />

            <Text style={styles.label}>Rol:</Text>
            <Picker selectedValue={role} style={styles.input} onValueChange={(itemValue) => setRole(itemValue)}>
              <Picker.Item label="Selecciona un rol" value="" />
              <Picker.Item label="Administrador" value="admin" />
              <Picker.Item label="Bodega" value="bodega" />
              <Picker.Item label="Motorista" value="motorista" />
            </Picker>
          </View>

        </ScrollView>

        {/* Botón fijo en la parte inferior */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
            <Text style={styles.createButtonText}>Crear</Text>

          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
            <Text style={styles.createButtonText}>Cancelar</Text>

          </TouchableOpacity>
        </View>

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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  form: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    backgroundColor:'transparent',
  },
  createButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NuevoUsuarioScreen;
