import React, { useEffect } from "react";
import { Layout, Menu, Typography, Button, Alert, Space } from "antd";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import {
  SettingOutlined,
  PieChartOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UserOutlined,
  ControlOutlined,
  FileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Inicio } from "../views/home/inicio";
import { Dashboard } from "../views/dashboard/dashboard";
import { Usuarios } from "../views/parameters/usuarios";
import { pagina1 } from "../views/processes/pagina1";
import { pagina2 } from "../views/processes/pagina2";
import { Reporte_usuarios } from "../views/reports/reporte_usuarios";
import { getUserId, nombreUsuario, tipoUsuario } from "../utils/sessionUtils";
import moment from "moment";
import "moment/locale/es-do";

export const MainMenu = (props) => {
  const { Title } = Typography;
  const { SubMenu, ItemGroup } = Menu;
  const { Sider, Content, Header } = Layout;

  const cerrarSesion = () => {
    sessionStorage.clear();
    localStorage.clear();
    props.history.push("/auth/login");
  };

  const Usuario = () => {
    return (
      <Menu theme="dark" mode="inline" defaultOpenKeys={["sub1"]}>
        <SubMenu key="sub1" icon={<SettingOutlined />} title="Procesos">
          <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to="/procesos/pagina1">Página 1</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/procesos/pagina2">Página 2</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  };

  const Administrador = () => {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["sub1", "sub2", "sub3"]}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        <SubMenu key="sub1" icon={<ControlOutlined />} title="Parámetros">
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/parámetros/usuarios">Usuarios</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<SettingOutlined />} title="Procesos">
          <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to="/procesos/pagina1">Página 1</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/procesos/pagina2">Página 2</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" icon={<PrinterOutlined />} title="Reportes">
          <Menu.Item key="5" icon={<FilePdfOutlined />}>
            <Link to="/reportes/usuarios">Usuarios</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  };

  useEffect(() => {
    if (!getUserId()) {
      props.history.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Layout className="menu-container" style={{ height: "100vh" }}>
        <Sider
          collapsedWidth="0"
          breakpoint="md"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <Menu theme="dark" mode="inline">
            <ItemGroup
              key="g1"
              title={
                <Title style={{ color: "white" }} level={2}>
                  Menú
                </Title>
              }
            />

            {tipoUsuario() === "Usuario" && <Usuario />}
            {tipoUsuario() === "Administrador" && <Administrador />}

            <ItemGroup
              key="g2"
              title={
                <Button size="large" onClick={cerrarSesion} danger ghost block>
                  <LogoutOutlined /> Cerrar sesión
                </Button>
              }
            />
          </Menu>
        </Sider>

        <Layout style={{ overflowY: "auto" }}>
          <Header
            style={{
              padding: 0,
            }}
          >
            <Alert
              description={
                <Title level={5}>
                  <Space>
                    Usuario conectado: {nombreUsuario()}
                    Fecha:
                    {moment().format("dddd, MMMM D YYYY")}
                  </Space>
                </Title>
              }
            />
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/inicio" component={Inicio} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/parámetros/usuarios" component={Usuarios} />
              <Route path="/procesos/pagina1" component={pagina1} />
              <Route path="/procesos/pagina2" component={pagina2} />
              <Route path="/reportes/usuarios" component={Reporte_usuarios} />
              <Redirect to="/inicio" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
