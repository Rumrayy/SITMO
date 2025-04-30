export interface ListaDeEntregasDTO {
  idEntrega: number;
  idUsuarioRepartidor: number;
  idDespachoPedido: number;
  fechaAceptada: string | null; 
  inicioDestino: string | null;
  finDestino: string | null;
  fechaEntrega: string;
  idDisposicion: number;
  disposicion: string;
  usuario: UsuarioDTO;
}

export interface UsuarioDTO {
  idUsuario: number;
  primerNombre: string;
  primerApellido: string;
  userName: string;
}

export interface ConteoDisposicionDTO {
    disposicion: string;
    cantidad: number;
  }
  