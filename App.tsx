import React from 'react';
import AppNavigator from './Navigation/Appnavigator';
import { AuthProvider } from './App/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaView>
  );
};


export default App;
