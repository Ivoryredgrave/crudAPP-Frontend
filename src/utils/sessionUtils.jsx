const getUserId = () => 
  sessionStorage.getItem("idusuario") || localStorage.getItem("idusuario");

export {
  getUserId,
}