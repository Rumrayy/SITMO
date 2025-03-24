import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (user && password) {
      Alert.alert('Inicio de sesión exitoso', `Bienvenido ${email}`);
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('./imag/logo_grupo_carosa.jpg')} 
        style={styles.topImage}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        
      </View>

      {/* Campos de entrada */}
      <Text style={styles.label}>User</Text>
      <TextInput
        style={styles.input}
        placeholder="user name"
        value={user}
        onChangeText={setUser}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="......"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => Alert.alert('Contacta soporte', 'Por favor, contacta a soporte para recuperar tu contraseña.')}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña? Contacta soporte</Text>
      </TouchableOpacity>

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign In</Text>
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
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 50, 
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    flex: 1, 
  },
 
  topImage: {
    width: 250, 
    height: 125,
    alignSelf: 'center', // Alineación a la izquierda
    marginBottom: 4, 
    marginTop: -10,
  },
  bottomImage: {
    width: 300, 
    height: 150,
    alignSelf: 'flex-start', // Alineación a la derecha
    marginTop: 0,
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
  forgotPassword: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;