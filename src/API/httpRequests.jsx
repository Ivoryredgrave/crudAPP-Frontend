// Configuración
const hostname = "localhost";
const port = 9000;

// Iniciar sesión
const backend_loginusuarios = `http://${hostname}:${port}/api/usuarios/login`;

// Dashboard
const backend_totaldeusuarios = `http://${hostname}:${port}/api/usuarios/total_de_usuarios`;
const backend_ultimousuario = `http://${hostname}:${port}/api/usuarios/ultimo_usuario_registrado`;
const backend_UsuariosEstado = `http://${hostname}:${port}/api/usuarios/usuarios_por_estado`;
const backend_UsuariosGenero = `http://${hostname}:${port}/api/usuarios/usuarios_por_genero`;

// Petición GET Usuarios
const backend_todosLosUsuarios = `http://${hostname}:${port}/api/usuarios/todos_los_usuarios`;

// Petición POST y PUT Usuarios
const backend_usuarios = `http://${hostname}:${port}/api/usuarios`;

export {
    backend_loginusuarios,
    backend_totaldeusuarios,
    backend_ultimousuario,
    backend_todosLosUsuarios,
    backend_usuarios,
    backend_UsuariosEstado,
    backend_UsuariosGenero
}