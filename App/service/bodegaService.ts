import axios from 'axios';
import { ListaDeFacturasDTO, FacturaFiltroDTO, AsignarFacturaDTO } from '../Types/ListaDeFacturasDTO';
import { ListaDeEntregasDTO, ConteoDisposicionDTO } from '../Types/ListaDeEntregaDTO';

const API_URL = 'https://localhost:44387/BodegaAcciones'; 

export const getFacturas = async (filtro: FacturaFiltroDTO): Promise<ListaDeFacturasDTO[]> => {
  const response = await axios.post<ListaDeFacturasDTO[]>(`${API_URL}/Facturas`, filtro);
  return response.data;
};

export const asignarFactura = async (dto: AsignarFacturaDTO): Promise<{ mensaje: string }> => {
  const response = await axios.post<{ mensaje: string }>(`${API_URL}/asignarFactura`, dto);
  return response.data;
};

export const getDisposiciones = async (): Promise<any[]> => {
  const response = await axios.get<any[]>(`${API_URL}/disposiciones`);
  return response.data;
};

export const getEmpresas = async (): Promise<any[]> => {
  const response = await axios.get<any[]>(`${API_URL}/Empresas`);
  return response.data;
};

export const getFacturaDetalle = async (factura: string): Promise<ListaDeFacturasDTO> => {
  const response = await axios.get<ListaDeFacturasDTO>(`${API_URL}/${factura}`);
  return response.data;
};

export const getEntregasPorDisposicion = async (idDisposicion: number): Promise<ListaDeEntregasDTO[]> => {
  const response = await axios.get<ListaDeEntregasDTO[]>(`${API_URL}/entregas/disposicion/${idDisposicion}`);
  return response.data;
};

export const getConteoEntregas = async (): Promise<ConteoDisposicionDTO[]> => {
  const response = await axios.get<ConteoDisposicionDTO[]>(`${API_URL}/entregas/conteo`);
  return response.data;
};
