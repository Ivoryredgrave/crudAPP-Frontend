import { Pie } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import { UsuariosEstado, UsuariosGenero } from "../API/apiUsuarios";

export const UsuariosGeneroPie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    UsuariosGenero(setData);
  }, []);

  const config = {
    appendPadding: 10,
    data: data,
    angleField: "total",
    color: ({ genero }) => (genero === "Masculino" ? "#5876d2" : "#e3a3bf"),
    colorField: "genero",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ genero, total }) => `${genero}: ${total}`,
      style: {
        fill: "#000000",
        fontSize: 16,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    legend: false,
  };

  return <Pie {...config} />;
};

export const UsuariosEstadoPie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    UsuariosEstado(setData);
  }, []);

  const config = {
    appendPadding: 10,
    data: data,
    angleField: "total",
    color: ({ estado }) => (estado === "Activo" ? "#59D5AB" : "#d25858"),
    colorField: "estado",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ estado, total }) => `${estado}: ${total}`,
      style: {
        fill: "#000000",
        fontSize: 16,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    legend: false,
  };

  return <Pie {...config} />;
};
