// components/HeaderRolesNav.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderRolesNav = ({ activeRole }) => {
  const navigation = useNavigation();

  const roles = [
    { name: 'Admin', screen: 'Personal' },
    { name: 'Motorista', screen: 'PersonalMotorista' },
    { name: 'Bodega', screen: 'PersonalBodega' },
  ];

  return (
    <View style={styles.container}>
      {roles.map(role => (
        <TouchableOpacity
          key={role.name}
          style={[
            styles.roleItem,
            activeRole === role.name && styles.activeRole,
          ]}
          onPress={() => {
            if (activeRole !== role.name) {
              navigation.navigate(role.screen);
            }
          }}
        >
          <Text style={styles.roleText}>{role.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleItem: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeRole: {
    backgroundColor: '#f0f0f0',
    borderColor: 'black',
  },
  roleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HeaderRolesNav;
