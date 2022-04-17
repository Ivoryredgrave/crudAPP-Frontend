import React from 'react';
import { Typography, Divider, Breadcrumb } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const pagina2 = () => {

    const { Title } = Typography;

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Página 2 | crudAPP™</title>
                </Helmet>

                <Title level={2}>Página 2</Title>

                <Breadcrumb>
                    <Breadcrumb.Item>Procesos</Breadcrumb.Item>
                    <Breadcrumb.Item>Página 2</Breadcrumb.Item>
                </Breadcrumb>

                <Divider />

            </HelmetProvider>
        </div>
    )
}