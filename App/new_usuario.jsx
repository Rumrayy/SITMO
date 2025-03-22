import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const NuevoUsuarioScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [role, setRole] = useState('');

  const handleCreateUser = () => {
    
    console.log('Usuario creado:', { firstName, lastName, email, tempPassword, role });
    alert('Usuario creado exitosamente');
  };

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>Nuevo usuario</Text>

      <Text style={styles.label}>Nombres:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Apellidos:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña temporal:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter temporary password"
        value={tempPassword}
        onChangeText={setTempPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Rol</Text>
      <TextInput
        style={styles.input}
        placeholder="Select a role"
        value={role}
        onChangeText={setRole}
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
        <Text style={styles.createButtonText}>Crear</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NuevoUsuarioScreen;