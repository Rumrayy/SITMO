import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const ChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const requirements = [
    { text: 'Mínimo 8 caracteres', isValid: newPassword.length >= 8 },
    { text: 'Al menos una mayúscula', isValid: /[A-Z]/.test(newPassword) },
    { text: 'Al menos un número', isValid: /[0-9]/.test(newPassword) },
    { text: 'Un carácter especial', isValid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) }
  ];

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  const handleChangePassword = () => {
    if (newPassword && confirmPassword && passwordsMatch) {
      Alert.alert('Contraseña cambiada', 'Tu contraseña ha sido actualizada exitosamente.');
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos y asegúrate de que las contraseñas coincidan.');
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