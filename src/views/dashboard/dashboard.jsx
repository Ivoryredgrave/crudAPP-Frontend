import React from "react";
import { Typography, Divider, Col, Row, Card } from "antd";
import { Helmet, HelmetProvider } from "react-helmet-async";

import {
  TotalDeUsuarios,
  UltimoUsuarioRegistrado,
} from "../../API/apiUsuarios";
import { UsuariosEstadoPie, UsuariosGeneroPie } from "../../components/charts";

export const Dashboard = () => {
  const { Title } = Typography;

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Dashboard | crudAPP™</title>
        </Helmet>

        <Title level={2}>Dashboard</Title>

        <Divider />

        <Row>
          <Col align="middle" span={12}>
            <Card
              title={<Title level={4}>Total de usuarios</Title>}
              style={{ backgroundColor: "#4BA6FE" }}
            >
              <TotalDeUsuarios />
            </Card>
          </Col>

          <Col align="middle" span={12}>
            <Card
              title={<Title level={4}>Último usuario registrado</Title>}
              style={{ backgroundColor: "#4BA6FE" }}
            >
              <UltimoUsuarioRegistrado />
            </Card>
          </Col>

          <Col align="middle" span={12}>
            <Card
              title={<Title level={4}>Usuarios por estado</Title>}
              style={{ backgroundColor: "#4BA6FE" }}
            >
              <UsuariosEstadoPie />
            </Card>
          </Col>

          <Col align="middle" span={12}>
            <Card
              title={<Title level={4}>Usuarios por género</Title>}
              style={{ backgroundColor: "#4BA6FE" }}
            >
              <UsuariosGeneroPie />
            </Card>
          </Col>
        </Row>
      </HelmetProvider>
    </div>
  );
};
