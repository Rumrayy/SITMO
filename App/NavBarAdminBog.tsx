// NavBarAdminBog.tsx
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBarAdmin from './NavBarAdmin';
import NavBarBod from './NavBVarBod';
import { AuthContext } from './AuthContext';

const NavBarAdminBog = () => {
  const { userToken } = useContext(AuthContext);
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    const obtenerRol = async () => {
      const rolGuardado = await AsyncStorage.getItem('userRole'); // asegúrate de usar esta clave al guardar
      setRol(rolGuardado?.toLowerCase() || null);
    };

    obtenerRol();
  }, [userToken]); // Se vuelve a cargar cuando cambia el token (ej. login/logout)

  if (!userToken || !rol) return null;

  if (rol === 'admin') {
    return <NavBarAdmin />;
  } else if (rol === 'bodega') {
    return <NavBarBod />;
  }

  return null;
};

export default NavBarAdminBog;
