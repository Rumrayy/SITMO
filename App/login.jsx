import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validUsers = {
  'admin@carosa.com': { 
    password: 'admin123', 
    name: 'Admin',
    role: 'admin', 
    screen: 'Admin' 
  },
  'bodega@carosa.com': { 
    password: 'bodega123', 
    name: 'Bodega',
    role: 'bodega',
    screen: 'Facturas'
  },
  'repartidor@carosa.com': { 
    password: 'repart123', 
    name: 'Repartidor',
    role: 'Repartidor',
    screen: 'Repartidor'
  }
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (validUsers[email] && validUsers[email].password === password) {
        const user = validUsers[email];
        await AsyncStorage.multiSet([
          ['userToken', 'authenticated'],
          ['userEmail', email],
          ['userRole', user.role]
        ]);
        
        Alert.alert('Éxito', `Bienvenido ${user.name}`);
        navigation.navigate(user.screen);
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al iniciar sesión');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const [userToken, userEmail, userRole] = await AsyncStorage.multiGet([
          'userToken',
          'userEmail',
          'userRole'
        ]);
        
        if (userToken[1] === 'authenticated' && userEmail[1] && userRole[1]) {
          if (validUsers[userEmail[1]] && validUsers[userEmail[1]].role === userRole[1]) {
            navigation.navigate(validUsers[userEmail[1]].screen);
          } else {
            await AsyncStorage.clear();
          }
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
        await AsyncStorage.clear();
      }
    };
    
    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
      </View>
      
      <Image
        source={require('./imag/grup_carosa1.png')}
        style={styles.topGroupImage}
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="usuario@carosa.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.toggleText}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => Alert.alert('Soporte', 'Contacta a soporte@carosa.com')}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      <Image
        source={require('./imag/grup_carosa2.png')}
        style={styles.bottomGroupImage}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topGroupImage: {
    width: 300,
    height: 149,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  bottomGroupImage: {
    width: 300,
    height: 149,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
  },
  toggleText: {
    fontSize: 20,
  },
  forgotPassword: {
    color: '#0066cc',
    textAlign: 'center',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;