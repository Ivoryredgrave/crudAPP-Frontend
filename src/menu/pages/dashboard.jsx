import React from 'react';
import { Typography, Divider, Col, Row, Card } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import {
    TotalDeUsuarios,
    UltimoUsuarioRegistrado,
    UsuariosEstado,
    UsuariosGenero
} from '../../components/chartUsuarios';

export const Dashboard = () => {

    const { Title } = Typography;

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Dashboard | crudAPP™</title>
                </Helmet>

                <Title level={2}>Dashboard</Title>
                <Title level={4}>
                    Hola {sessionStorage.getItem("nombrecompleto") ||
                        localStorage.getItem("nombrecompleto")}, bienvenido de nuevo
                </Title>

                <Divider />

                <Row >
                    <Col align="middle" span={12}>
                        <Card title={<Title level={4}>Total de usuarios</Title>}
                            style={{ backgroundColor: '#4BA6FE' }}>
                            <TotalDeUsuarios />
                        </Card>
                    </Col>

                    <Col align="middle" span={12}>
                        <Card title={<Title level={4}>Último usuario registrado</Title>}
                            style={{ backgroundColor: '#FF838A' }}>
                            <UltimoUsuarioRegistrado />
                        </Card>
                    </Col>

                    <Col align="middle" span={12}>
                        <Card title={<Title level={4}>Usuarios por estado</Title>}
                            style={{ backgroundColor: '#c383ff' }}>
                            <UsuariosEstado />
                        </Card>
                    </Col>

                    <Col align="middle" span={12}>
                        <Card title={<Title level={4}>Usuarios por género</Title>}
                            style={{ backgroundColor: '#ffc183' }}>
                                <UsuariosGenero />
                        </Card>
                    </Col>

                </Row>

            </HelmetProvider>
        </div>
    )
}