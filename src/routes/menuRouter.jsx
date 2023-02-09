import React, { useEffect } from 'react';
import { Layout, Menu, Typography, Button, Divider, Badge, Alert, Space } from 'antd';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import {
  SettingOutlined, PieChartOutlined,
  FilePdfOutlined, PrinterOutlined,
  UserOutlined, ControlOutlined,
  FileOutlined, LogoutOutlined
} from '@ant-design/icons';

import { Inicio } from '../views/pages/inicio';
import { Dashboard } from '../views/pages/dashboard';
import { Usuarios } from '../views/pages/usuarios';
import { pagina1 } from '../views/pages/pagina1';
import { pagina2 } from '../views/pages/pagina2';
import { Reporte_usuarios } from '../views/reports/reporte_usuarios';
import { getUserId } from "../utils/sessionUtils";
import moment from "moment";
import "moment/locale/es-do";

export const MainMenu = (props) => {

  const { Title } = Typography;
  const { SubMenu, ItemGroup } = Menu;
  const { Sider, Content, Footer } = Layout;
  const tipodeusuario = sessionStorage.getItem("tipodeusuario") || localStorage.getItem("tipodeusuario");

  const cerrarSesion = () => {
    sessionStorage.clear();
    localStorage.clear();
    props.history.push("/auth/login");
  };

  const Usuario = () => {
    return (
      <Menu theme='dark' mode="inline" defaultOpenKeys={["sub1"]}>

        <SubMenu key="sub1" icon={<SettingOutlined />} title="Procesos">

          <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to="/procesos/pagina1">
              Página 1
            </Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/procesos/pagina2">
              Página 2
            </Link>
          </Menu.Item>

        </SubMenu>

      </Menu>
    )
  };

  const Administrador = () => {
    return (
      <Menu theme='dark' mode="inline" defaultOpenKeys={["sub1", "sub2", "sub3"]}>

        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </Menu.Item>

        <SubMenu key="sub1" icon={<ControlOutlined />} title="Parámetros">
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/parámetros/usuarios">
              Usuarios
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<SettingOutlined />} title="Procesos">

          <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to="/procesos/pagina1">
              Página 1
            </Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/procesos/pagina2">
              Página 2
            </Link>
          </Menu.Item>

        </SubMenu>

        <SubMenu key="sub3" icon={<PrinterOutlined />} title="Reportes">
          <Menu.Item key="5" icon={<FilePdfOutlined />}>
            <Link to="/reportes/usuarios">
              Usuarios
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  };

  useEffect(() => {
    if (!getUserId()) {
      props.history.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Layout className='menu-container'>

        <Sider collapsedWidth="0"
          breakpoint="md">

          <Menu theme='dark' mode="inline">
            <ItemGroup key="g1"
              title={<Title style={{ color: "white" }} level={2}>Menú</Title>}
            />

            {tipodeusuario === 'Usuario' && <Usuario />}
            {tipodeusuario === 'Administrador' && <Administrador />}

            <ItemGroup key="g2"
              title={<Button size="large" onClick={cerrarSesion} danger ghost block>
                <LogoutOutlined /> Cerrar sesión
              </Button>} />
          </Menu>

        </Sider>

        <Layout>
          <Content
            style={{
              margin: '24px 16px',
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

          <Footer style={{ textAlign: 'center' }}>
            <Divider />
            <Alert
              description={
                <Title level={5}>
                  <Space>
                    <Badge status="processing" />
                    Usuario conectado:
                    {sessionStorage.getItem("nombreusuario") || localStorage.getItem("nombreusuario")}
                    <Badge status="processing" /> Fecha: {moment().format("dddd, MMMM D YYYY")}
                  </Space>
                </Title>} />
          </Footer>

        </Layout>
      </Layout>
    </BrowserRouter>
  )
}
