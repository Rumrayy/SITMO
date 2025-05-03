
import axios from 'axios';
import { InicioSesionDTO, CambiarContrasenaDTO} from '../Types/Login';

const API_URL = 'https://monitoreoapi.edwindeveloper.online/InicioSesion'; 

export const validarSesion = async (datos: InicioSesionDTO) => {
  const response = await axios.post(`${API_URL}/Validar`, datos);
  return response.data;
};

export const cambiarContrasena = async (datos: CambiarContrasenaDTO) => {
  const response = await axios.post(`${API_URL}/CambiarContrasena`, datos);
  return response.data;
};
