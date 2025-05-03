import axios from 'axios';
import { VistaUsuariosDTO } from '../Types/VistaUsuario';
import { AgregarUsuarioDTO } from '../Types/AgregarUsuarioDTO';
import { ListaDeEntregasDTO } from '../Types/ListaDeEntregaDTO';
import { RecorridoEntregaDTO } from '../Types/RecorridoEntregaDTO';
const API_URL = 'https://localhost:44387/VistaUsuarios'; 

export const getRepartidores = async (): Promise<VistaUsuariosDTO[]> => {
    const response = await axios.get<VistaUsuariosDTO[]>(`${API_URL}/Repartidores`);
    return response.data;
  };
  
  export const getAdmins = async (): Promise<VistaUsuariosDTO[]> => {
    const response = await axios.get<VistaUsuariosDTO[]>(`${API_URL}/Admins`);
    return response.data;
  };
  
  export const getBodegas = async (): Promise<VistaUsuariosDTO[]> => {
    const response = await axios.get<VistaUsuariosDTO[]>(`${API_URL}/Bodegas`);
    return response.data;
  };
  
  export const getDisposiciones = async (): Promise<any[]> => {
    const response = await axios.get<any[]>(`${API_URL}/disposiciones`);
    return response.data;
  };
  
  export const agregarUsuario = async (usuario: AgregarUsuarioDTO): Promise<VistaUsuariosDTO> => {
    const response = await axios.post<VistaUsuariosDTO>(`${API_URL}/AgregarUsuario`, usuario);
    return response.data;
  };
  
  export const getEntregasPorRepartidor = async (idRepartidor: number): Promise<ListaDeEntregasDTO[]> => {
    const response = await axios.get<ListaDeEntregasDTO[]>(`${API_URL}/entregas/repartidor/${idRepartidor}`);
    return response.data;
  };
  
  export const getEstadoRepartidor = async (idRepartidor: number): Promise<VistaUsuariosDTO> => {
    const response = await axios.get<VistaUsuariosDTO>(`${API_URL}/estado/repartidor/${idRepartidor}`);
    return response.data;
  };
  
  export const eliminarUsuario = async (id: number): Promise<string> => {
    const response = await axios.delete<string>(`${API_URL}/usuarios/${id}`);
    return response.data;
  };

  export const crearRecorrido = (data: RecorridoEntregaDTO, latitude: any, longitude: any, idEstadoCatalogo: number, batteryLevel: number, isWifiEnabled: boolean, isCellularEnabled: boolean, connectionQuality: string, deviceInfo: { modelName: string; osName: string; osVersion: string; isDevice: boolean; deviceName: string; designName: string; productName: string; deviceYearClass: number; supportedCpuArchitectures: string[]; osBuildId: string; }) => {
    return axios.post(`${API_URL}/RecorridoEntrega`, data);
  };