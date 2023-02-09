import React from 'react';
import { Typography, Divider } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { migajaDePan } from '../../components/components';

export const pagina2 = () => {

    const { Title } = Typography;

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Página 2 | crudAPP™</title>
                </Helmet>

                <Title level={2}>Página 2</Title>

                {migajaDePan("Procesos", "Página 2")}

                <Divider />

            </HelmetProvider>
        </div>
    )
}