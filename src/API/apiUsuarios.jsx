import React, { useState, useEffect } from 'react';

import {
  backend_ultimousuario,
  backend_totaldeusuarios,
  backend_UsuariosEstado,
  backend_UsuariosGenero,
  backend_todosLosUsuarios
} from "../API/httpRequests";
import { Typography, Spin } from 'antd';
import axios from "axios";

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

export function TotalDeUsuarios() {

  const [todos, setTodos] = useState()

  useEffect(() => {
    const peticion = backend_totaldeusuarios
    const fetchApi = async () => {
      const response = await fetch(peticion)
      const responseJSON = await response.json()
      setTodos(responseJSON)
    }
    fetchApi();
  }, [])

  return (
    <div>
      <Title style={{ color: 'white' }} level={3}>
        {!todos ? <Spin style={{ color: 'black' }} size="large" /> : todos.map((todo, index) => {
          return <li key={index}>{todo.total}</li>
        })}
      </Title>
    </div>
  )
};

export function UltimoUsuarioRegistrado() {

  const [todos, setTodos] = useState()

  useEffect(() => {
    const peticion = backend_ultimousuario
    const fetchApi = async () => {
      const response = await fetch(peticion)
      const responseJSON = await response.json()
      setTodos(responseJSON)
    }
    fetchApi();
  }, [])

  return (
    <div>
      <Title style={{ color: 'white' }} level={3}>
        {!todos ? <Spin style={{ color: 'black' }} size="large" /> : todos.map((todo, index) => {
          return <li key={index}>{todo.UltimoUsuarioRegistrado}</li>
        })}
      </Title>
    </div>
  )
};

export function UsuariosEstado() {

  const [todos, setTodos] = useState()

  useEffect(() => {
    const peticion = backend_UsuariosEstado
    const fetchApi = async () => {
      const response = await fetch(peticion)
      const responseJSON = await response.json()
      setTodos(responseJSON)
    }
    fetchApi();
  }, [])

  return (
    <div>
      <Title style={{ color: 'white' }} level={3}>
        {!todos ? <Spin style={{ color: 'black' }} size="large" /> : todos.map((todo, index) => {
          return <li key={index}>{todo.estado} {todo.total}</li>
        })}
      </Title>
    </div>
  )
};

export function UsuariosGenero() {

  const [todos, setTodos] = useState()

  useEffect(() => {
    const peticion = backend_UsuariosGenero
    const fetchApi = async () => {
      const response = await fetch(peticion)
      const responseJSON = await response.json()
      setTodos(responseJSON)
    }
    fetchApi();
  }, [])

  return (
    <div>
      <Title style={{ color: 'white' }} level={3}>
        {!todos ? <Spin style={{ color: 'black' }} size="large" /> : todos.map((todo, index) => {
          return <li key={index}>{todo.genero} {todo.total}</li>
        })}
      </Title>
    </div>
  )
};