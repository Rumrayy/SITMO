import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './App/login';
import ChangePasswordScreen from './App/password';
//<LoginScreen />
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <ChangePasswordScreen />
    </SafeAreaView>
  );
};

export default App;