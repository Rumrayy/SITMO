import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './App/login';                //<LoginScreen />
import ChangePasswordScreen from './App/password';    //<ChangePasswordScreen />
import AdminScreen from './App/inicioadmin_p';        //<AdminScreen />
import PersonalScreen from './App/p_admin';           //<PersonalScreen />
import PersonalBodegaScreen from './App/p_bodega';    //<PersonalbodegaScreen />
import PersonalMotoristaScreen from './App/p_motorista'; //<PersonalMotoristaScreen />
import NuevoUsuarioScreen from './App/new_usuario';    //<NuevoUsuarioScreen />
import LocationComponent from '../sitmoo/Navigation/Appnavigator'; 




const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LocationComponent />
      
    </SafeAreaView>
  );
};

export default App;