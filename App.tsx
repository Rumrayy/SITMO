import React from 'react';
import { SafeAreaView } from 'react-native';

import LoginScreen from './App/login';
import ChangePasswordScreen from './App/password';
import AdminScreen from './App/inicioadmin_p';
import PersonalScreen from './App/p_admin';
import PersonalbodegaScreen from './App/p_bodega';
import PersonalMotoristaScreen from './App/p_motorista';
import NuevoUsuarioScreen from './App/new_usuario';
import LocationComponent from './App/p_admin_ubicacion';

//<LoginScreen />
//<ChangePasswordScreen />
//<AdminScreen />
//<PersonalScreen />
//<PersonalbodegaScreen />
//<PersonalMotoristaScreen navigation={undefined} />
//<NuevoUsuarioScreen />


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
      
    </SafeAreaView>
  );
};

export default App;