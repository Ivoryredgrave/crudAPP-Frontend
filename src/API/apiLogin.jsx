import Swal from "sweetalert2";
import axios from "axios";
import { backend_loginusuarios } from "./httpRequests";

export const iniciarSesion = async (form, props) => {
  await axios
    .get(
      backend_loginusuarios +
        `?usuario=${form.nombreusuario}&contrasena=${form.contrasena}`
    )
    .then((response) => {
      const { data } = response;
      if (data.length > 0) {
        let respuesta = data[0];
        const { idusuario, nombreusuario, nombrecompleto, tipodeusuario } =
          respuesta;

        sessionStorage.setItem("idusuario", idusuario);
        sessionStorage.setItem("nombreusuario", nombreusuario?.toUpperCase());
        sessionStorage.setItem("nombrecompleto", nombrecompleto);
        sessionStorage.setItem("tipodeusuario", tipodeusuario);

        props.history.push("/inicio");
      } else {
        Swal.fire("Error", "Usuario y/o contraseña incorrectos.", "error");
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire(
        "¡Ups! Algo ha salido mal",
        "Lo sentimos, en este momento no podemos procesar su solicitud debido a un problema técnico en nuestro servidor. Por favor, póngase en contacto con nuestro equipo de soporte para obtener ayuda.",
        "error"
      );
    });
};
