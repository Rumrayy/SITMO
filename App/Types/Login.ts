export interface InicioSesionDTO {
    correo: string;
    contrasena: string;
}

export interface CambiarContrasenaDTO {
    correo: string;
    contrasena: string;
    nuevaContrasena: string;
    confirmarNuevaContrasena: string;
}
  