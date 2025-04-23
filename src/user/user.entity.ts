enum rolesDisponibles {
  ADMINISTRADOR = 'ADMINISTRADOR',
  CLIENTE = 'CLIENTE',
}

export class Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  contraseña: string;
  rol: rolesDisponibles;
}
