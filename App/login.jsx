import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.6:44387/InicioSesion/Validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: email,
          contrasena: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (data.DebeCambiarContrasena) {
          navigation.navigate('ChangePassword', { nombreUsuario: data.nombreUsuario, contrasena: data.contrasena});
        } else if (data.rolId === 1) {
          navigation.navigate('Admin');
        } else if (data.rolId === 2) {
          navigation.navigate('Bodega');
        }else {
          navigation.navigate('Repartidor');
        }
      } else {
        Alert.alert('Credenciales incorrectas', 'Verifica tu usuario y contraseña.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de conexión', 'No se pudo conectar al servidor.');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        
      </View>
      <Image
        source={require('./imag/grup_carosa1.png')} 
        style={styles.topImage}
      />

      {/* Campos de entrada */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="your@email.com"
        value={email}
        onChangeText={setEmail}
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

      
      <Image
        source={require('./imag/grup_carosa2.png')} 
        style={styles.bottomImage}
      />
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
    fontSize: 40, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    flex: 1, 
  },
 
  topImage: {
    width: 300, 
    height: 150,
    alignSelf: 'flex-start', // Alineación a la izquierda
    marginBottom: 0, 
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