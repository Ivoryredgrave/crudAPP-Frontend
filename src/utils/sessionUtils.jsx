const getUserId = () =>
  sessionStorage.getItem("idusuario") || localStorage.getItem("idusuario");

const tipoUsuario = () =>
  sessionStorage.getItem("tipodeusuario") ||
  localStorage.getItem("tipodeusuario");

const nombreUsuario = () =>
  sessionStorage.getItem("nombrecompleto") ||
  localStorage.getItem("nombrecompleto");

export { getUserId, tipoUsuario, nombreUsuario };
