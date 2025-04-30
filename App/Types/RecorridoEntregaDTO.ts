export interface CrearRecorridoDTO {
    idEntrega?: number;
    idUsuario: number;
    latitud: number;
    longitud: number;
    idEstado: number;
    infoDispositivo?: string;
    fechaAsignada?: Date;
  }