export interface AgregarUsuarioDTO {
  primerNombre: string;
  primerApellido: string;
  telefono: number;
  correo: string;
  contrasena: string;
  nombreUsuario: string;
  idRol: number;
  debeCambiarContrasena: boolean;
}
