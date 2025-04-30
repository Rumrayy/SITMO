export interface ListaDeFacturasDTO {
    idFacturaLinea: number;
    pedido: string | null;
    factura: string | null;
    montoCobrado: number;
    fechaEntrega: string; 
    direccionFactura: string | null;
    direccionEmbarque: string | null;
    nombreEmpresa: string | null;
    ruta: string | null;
    estaAsignada: boolean;
    disposicion: string | null;
  }
  
  export interface FacturaFiltroDTO {
    empresa?: string;
    disposicion?: string;
    estaAsignada?: boolean;
  }

  export interface AsignarFacturaDTO {
    factura: string;
    idUsuarioRepartidor: number;
    nombreUsuario: string;
  }
  