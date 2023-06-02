import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Typography } from "antd";

export const Inicio = () => {
  const { Title } = Typography;

  return (
    <div className="inicio">
      <HelmetProvider>
        <Helmet>
          <title>Inicio | crudAPP™</title>
        </Helmet>

        <Title level={3} className="titulo-bienvenida">
          Hola{" "}
          {sessionStorage.getItem("nombrecompleto") ||
            localStorage.getItem("nombrecompleto")}
          , bienvenid@ a crudAPP™
        </Title>
      </HelmetProvider>
    </div>
  );
};
