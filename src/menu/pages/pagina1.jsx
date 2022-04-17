import React from 'react';
import { Typography, Divider, Breadcrumb } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const pagina1 = () => {

    const { Title } = Typography;

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Página 1 | crudAPP™</title>
                </Helmet>

                <Title level={2}>Página 1</Title>

                <Breadcrumb>
                    <Breadcrumb.Item>Procesos</Breadcrumb.Item>
                    <Breadcrumb.Item>Página 1</Breadcrumb.Item>
                </Breadcrumb>

                <Divider />

            </HelmetProvider>
        </div>
    )
}