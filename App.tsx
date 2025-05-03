import React from 'react';
import AppNavigator from './Navigation/Appnavigator';
import { AuthProvider } from './App/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};


export default App;
