import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cambiarContrasena } from './service/LoginService';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      const correo = await AsyncStorage.getItem('userEmail');
      setEmail(correo || '');
    };
    loadUserData();
  }, []);


  const requirements = [
    { text: 'Mínimo 8 caracteres', isValid: newPassword.length >= 8 },
    { text: 'Al menos una mayúscula', isValid: /[A-Z]/.test(newPassword) },
    { text: 'Al menos un número', isValid: /[0-9]/.test(newPassword) },
    { text: 'Un carácter especial', isValid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) }
  ];

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  const handleChangePassword = async () => {
     if (!currentPassword || !newPassword || !confirmPassword || !passwordsMatch) {
      Alert.alert('Error', 'Completa todos los campos correctamente.');
      return;
    }
    try {
      const dto = {
        Correo: email,
        Contrasena: currentPassword,
        NuevaContrasena: newPassword,
        ConfirmarNuevaContrasena: confirmPassword
      };
      const response = await cambiarContrasena(dto);
      Alert.alert('Éxito', response.mensaje || 'Contraseña actualizada.');

      const roleId = await AsyncStorage.getItem('userRole');
      if (roleId === '1') {
        navigation.reset({ index: 0, routes: [{ name: 'Admin' }] });
      } else if (roleId === '2') {
        navigation.reset({ index: 0, routes: [{ name: 'Facturas' }] });
      } else if (roleId === '3') {
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
      }
    } catch (error) {
      console.error('Cambio error:', error);
      Alert.alert('Error', 'No se pudo cambiar la contraseña. Verifica tus datos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./imag/pass.png')} 
        style={styles.topImage}
      />

      <Text style={styles.title}>Cambiar Contraseña</Text>

      <Text style={styles.securityMessage}>
        Por razones de seguridad, debe cambiar su contraseña antes de continuar. Esta acción es obligatoria para acceder al sistema.
      </Text>

      <Text style={styles.label}>Nueva Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="**********"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="**********"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <Text style={[styles.requirement, passwordsMatch ? styles.validRequirement : styles.invalidRequirement]}>
        {passwordsMatch ? '✔' : '✖'} Las contraseñas coinciden
      </Text>

      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>La contraseña debe contener:</Text>
        {requirements.map((req, index) => (
          <Text key={index} style={[styles.requirement, req.isValid && styles.validRequirement]}>
            {req.isValid ? '✔' : '✖'} {req.text}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.changePasswordButtonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  topImage: {
    width: 100,
    height: 100,
    alignSelf: 'center', 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  securityMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  requirementsContainer: {
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requirement: {
    fontSize: 14,
    marginBottom: 4,
    color: 'red',
  },
  validRequirement: {
    color: 'green',
  },
  invalidRequirement: {
    color: 'red',
  },
  changePasswordButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  changePasswordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;