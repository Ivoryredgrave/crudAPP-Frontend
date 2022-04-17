import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const Inicio = () => {

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Inicio | crudAPP™</title>
                </Helmet>

            </HelmetProvider>
        </div>
    )
}