import React, { useState, useEffect } from "react";
import { Typography, Divider, Button, Space, Popover, Input } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FileOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { peticionGetUsuarios } from "../../API/apiUsuarios";
import { TablaAntDesign, migajaDePan, descargarExcel, descargarPDF } from "../../components/components";
import 'jspdf-autotable';
import "moment/locale/es-do";

export const Reporte_usuarios = () => {

    const { Title } = Typography;
    const [data, setData] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    const columns = [
        {
            title: 'ID usuario',
            dataIndex: 'idusuario',
            key: 'idusuario',
        },
        {
            title: 'Tipo de usuario',
            dataIndex: 'tipodeusuario',
            key: 'tipodeusuario',
            filters: [
                {
                    text: 'Administrador',
                    value: 'Administrador',
                },
                {
                    text: 'Usuario',
                    value: 'Usuario',
                },
            ],
            onFilter: (value, record) => record.tipodeusuario.indexOf(value) === 0,
        },

        {
            title: 'Nombre completo',
            dataIndex: 'nombrecompleto',
            key: 'nombrecompleto',
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <div style={{ display: "flex", flex: 1, justifyContent: "center", padding: 8 }}>
                        <Space>

                            <Input
                                autoFocus
                                placeholder="Buscar por nombre"
                                value={selectedKeys[0]}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                                    confirm({ closeDropdown: false });
                                }}
                                onPressEnter={() => {
                                    confirm();
                                }}
                                onBlur={() => {
                                    confirm();
                                }}
                            ></Input>
                            <Button
                                onClick={() => {
                                    confirm();
                                }}
                                type="primary"
                            >
                                Buscar
                            </Button>
                            <Button
                                onClick={() => {
                                    clearFilters();
                                }}
                                type="danger"
                            >
                                Reiniciar
                            </Button>
                        </Space>
                    </div>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.nombrecompleto.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: 'Género',
            dataIndex: 'genero',
            key: 'genero',
            filters: [
                {
                    text: 'Masculino',
                    value: 'Masculino',
                },
                {
                    text: 'Femenino',
                    value: 'Femenino',
                },
            ],
            onFilter: (value, record) => record.genero.indexOf(value) === 0,
        },
        {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Celular',
            dataIndex: 'celular',
            key: 'celular',
        },
        {
            title: 'Estado',
            key: 'estado',
            dataIndex: 'estado',
            filters: [
                { text: 'Activo', value: 'Activo' },
                { text: 'Inactivo', value: 'Inactivo' },
            ],
            onFilter: (value, record) => record.estado.indexOf(value) === 0,
            render: text => {
                let color = text === 'Activo' ? '#1dc43e' : '#F5AB56';
                return <div className="cell" style={{ background: color }}>{text}</div>;
            },
        },
        {
            title: 'Nombre de usuario',
            dataIndex: 'nombreusuario',
            key: 'nombreusuario',
        },
        {
            title: 'Fecha de registro',
            dataIndex: 'fecha_registro',
            key: 'fecha_registro',
        },
        {
            title: 'Añadido por',
            dataIndex: 'usuario_insercion',
            key: 'usuario_insercion',
        },
        {
            title: 'Actualizado por',
            dataIndex: 'usuario_actualizacion',
            key: 'usuario_actualizacion',
        },
        {
            title: 'Fecha de actualización',
            dataIndex: 'fecha_actualizacion',
            key: 'fecha_actualizacion',
        },
    ];

    const content = (
        <Space>
            <Button size="large" onClick={() => { descargarPDF(filteredInfo, data, columns, "Reporte de usuarios", "Reporte de usuarios - crudAPP.pdf") }}>
                <FileOutlined />
                Exportar en PDF
            </Button>

            <Button size="large" onClick={() => { descargarExcel(filteredInfo, data, "Usuarios", "Reporte de usuarios - crudAPP.xlsx") }}>
                <FileOutlined />
                Exportar en Excel
            </Button>
        </Space>
    );

    useEffect(() => {
        peticionGetUsuarios(setData);
    }, []);

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Reporte de usuarios | crudAPP™</title>
                </Helmet>

                <Title level={2}>Reporte de Usuarios</Title>

                {migajaDePan("Reportes", "Usuarios")}

                <Divider />

                <Popover content={content}>
                    <Button size="large" type="primary"> <PrinterOutlined /> Exportar</Button>
                </Popover>

                <br />
                <br />

                {TablaAntDesign(columns, data, handleChange, "idusuario")}

            </HelmetProvider>
        </div >
    )
}