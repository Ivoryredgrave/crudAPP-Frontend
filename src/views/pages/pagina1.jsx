import React from 'react';
import { Typography, Divider } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { migajaDePan } from '../../components/components';

export const pagina1 = () => {

    const { Title } = Typography;

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Página 1 | crudAPP™</title>
                </Helmet>

                <Title level={2}>Página 1</Title>

                {migajaDePan("Procesos", "Página 1")}

                <Divider />

            </HelmetProvider>
        </div>
    )
}