import React, { useState, useEffect } from "react";

import {
  backend_ultimousuario,
  backend_totaldeusuarios,
  backend_UsuariosEstado,
  backend_UsuariosGenero,
  backend_todosLosUsuarios,
  backend_usuarios,
} from "../API/httpRequests";
import { Typography, Spin } from "antd";
import axios from "axios";
import { eliminarPropiedadesVacias } from "../components/components";
import Swal from "sweetalert2";

const { Title } = Typography;

export const peticionGetUsuarios = async (setData) => {
  await axios
    .get(backend_todosLosUsuarios)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const peticionPostUsuarios = async (
  usuarioSeleccionado,
  setData,
  abrirCerrarModalInsertar
) => {
  if (/^\s*$/.test(usuarioSeleccionado.nombrecompleto)) {
    Swal.fire("Nombre inválido", "El nombre no puede estar vacío.", "error");
    return;
  } else if (
    usuarioSeleccionado?.contrasena !== usuarioSeleccionado?.repeatPassword
  ) {
    Swal.fire(
      "Contraseñas no coinciden",
      "Las contraseñas ingresadas NO son iguales, por favor revise e intente nuevamente.",
      "error"
    );
    return;
  } else if (/^\s*$/.test(usuarioSeleccionado.nombreusuario)) {
    Swal.fire(
      "Nombre de usuario inválido",
      "El nombre de usuario no puede estar vacío.",
      "error"
    );
    return;
  } else if (/^\s*$/.test(usuarioSeleccionado.contrasena)) {
    Swal.fire(
      "Contraseña inválida",
      "La contraseña no puede estar vacía.",
      "error"
    );
    return;
  }

  const userForCreate = {
    nombrecompleto: usuarioSeleccionado.nombrecompleto,
    genero: usuarioSeleccionado.genero,
    telefono: usuarioSeleccionado.telefono,
    celular: usuarioSeleccionado.celular,
    estado: "Activo",
    idareatrabajo: usuarioSeleccionado?.idareatrabajo,
    nombreusuario: usuarioSeleccionado.nombreusuario,
    contrasena: usuarioSeleccionado.contrasena,
    usuario_insercion:
      sessionStorage.getItem("nombreusuario")?.toUpperCase() ||
      localStorage.getItem("nombreusuario")?.toUpperCase(),
    tipodeusuario: usuarioSeleccionado.tipodeusuario,
  };

  await axios
    .post(backend_usuarios, {
      newUser: eliminarPropiedadesVacias(userForCreate),
    })
    .then((response) => {
      const data = response?.data;
      if (data.code === "ER_DUP_ENTRY") {
        Swal.fire("Usuario duplicado", "Este registro ya existe.", "error");
        return;
      } else if (data.rowsInserted > 0) {
        Swal.fire(
          "Éxito al guardar",
          "Se ha creado el nuevo registro.",
          "success"
        );
        peticionGetUsuarios(setData);
        abrirCerrarModalInsertar();
      } else {
        console.log(response);
        Swal.fire(
          "Error al guardar el registro",
          "Ha ocurrido un error al crear el nuevo registro.",
          "error"
        );
        abrirCerrarModalInsertar();
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire(
        "¡Ups! Algo ha salido mal",
        "Lo sentimos, en este momento no podemos procesar su solicitud debido a un problema técnico en nuestro servidor. Por favor, póngase en contacto con nuestro equipo de soporte para obtener ayuda.",
        "error"
      );
      abrirCerrarModalInsertar();
    });
};

export const peticionPutUsuarios = async (
  usuarioSeleccionado,
  setData,
  abrirCerrarModalEditar
) => {
  const {
    nombrecompleto,
    genero,
    telefono,
    celular,
    tipodeusuario,
    contrasena,
    estado,
    idareatrabajo,
  } = usuarioSeleccionado;

  const userForUpdate = {
    nombrecompleto,
    genero,
    telefono,
    celular,
    idareatrabajo,
    usuario_actualizacion:
      sessionStorage.getItem("nombreusuario")?.toUpperCase() ||
      localStorage.getItem("nombreusuario")?.toUpperCase(),
    tipodeusuario,
    contrasena: contrasena?.length > 0 ? contrasena : undefined,
    estado,
  };

  if (
    usuarioSeleccionado?.contrasena !== usuarioSeleccionado["repeatPassword"]
  ) {
    Swal.fire(
      "Contraseñas no coinciden",
      "Las contraseñas ingresadas NO son iguales, por favor revise e intente nuevamente.",
      "error"
    );
    return;
  } else {
    delete usuarioSeleccionado["repeatPassword"];
  }

  await axios
    .put(backend_usuarios + "/" + usuarioSeleccionado?.idusuario, {
      user: eliminarPropiedadesVacias(userForUpdate),
    })
    .then((response) => {
      if (/^\s*$/.test(usuarioSeleccionado.nombrecompleto)) {
        Swal.fire(
          "Nombre inválido",
          "El nombre no puede estar vacío.",
          "error"
        );
        return;
      }
      if (response.data.rowsInserted > 0) {
        Swal.fire(
          "Registro actualizado",
          "Se ha actualizado el registro.",
          "success"
        );
        peticionGetUsuarios(setData);
        abrirCerrarModalEditar();
      } else {
        console.log(response);
        Swal.fire(
          "Error al actualizar el registro",
          "Ha ocurrido un error al actualizar el registro.",
          "error"
        );
        abrirCerrarModalEditar();
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire(
        "¡Ups! Algo ha salido mal",
        "Lo sentimos, en este momento no podemos procesar su solicitud debido a un problema técnico en nuestro servidor. Por favor, póngase en contacto con nuestro equipo de soporte para obtener ayuda.",
        "error"
      );
      abrirCerrarModalEditar();
    });
};

export function TotalDeUsuarios() {
  const [todos, setTodos] = useState();

  useEffect(() => {
    const peticion = backend_totaldeusuarios;
    const fetchApi = async () => {
      const response = await fetch(peticion);
      const responseJSON = await response.json();
      setTodos(responseJSON);
    };
    fetchApi();
  }, []);

  return (
    <div>
      <Title style={{ color: "white" }} level={3}>
        {!todos ? (
          <Spin style={{ color: "black" }} size="large" />
        ) : (
          todos.map((todo, index) => {
            return <li key={index}>{todo.total}</li>;
          })
        )}
      </Title>
    </div>
  );
}

export function UltimoUsuarioRegistrado() {
  const [todos, setTodos] = useState();

  useEffect(() => {
    const peticion = backend_ultimousuario;
    const fetchApi = async () => {
      const response = await fetch(peticion);
      const responseJSON = await response.json();
      setTodos(responseJSON);
    };
    fetchApi();
  }, []);

  return (
    <div>
      <Title style={{ color: "white" }} level={3}>
        {!todos ? (
          <Spin style={{ color: "black" }} size="large" />
        ) : (
          todos.map((todo, index) => {
            return <li key={index}>{todo.UltimoUsuarioRegistrado}</li>;
          })
        )}
      </Title>
    </div>
  );
}

export const UsuariosEstado = async (setData) => {
  try {
    const response = await axios.get(backend_UsuariosEstado);
    const responseJSON = response.data;
    setData(
      responseJSON.map((item) => ({
        estado: item.estado,
        total: item.total,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

export const UsuariosGenero = async (setData) => {
  try {
    const response = await axios.get(backend_UsuariosGenero);
    const responseJSON = response.data;
    setData(
      responseJSON.map((item) => ({
        genero: item.genero,
        total: item.total,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};
