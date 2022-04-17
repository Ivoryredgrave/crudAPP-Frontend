import React, { useState, useEffect } from "react";
import {
    Typography, Divider, Breadcrumb, Table, Button, Row, Col
} from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FilePdfOutlined } from "@ant-design/icons";
import axios from "axios";
import {
    backend_todosLosUsuarios, backend_UsuariosMasculinos,
    backend_UsuariosFemeninos, backend_UsuariosActivos,
    backend_UsuariosInactivos, backend_UsuariosAdmin,
    backend_UsuariosUser
} from "../../../local";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import moment from "moment";
import "moment/locale/es-do";

import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';

export const Reporte_usuarios = () => {

    const { Title } = Typography;
    const [data, setData] = useState([]);

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
        },

        {
            title: 'Nombre completo',
            dataIndex: 'nombrecompleto',
            key: 'nombrecompleto',
        },
        {
            title: 'Género',
            dataIndex: 'genero',
            key: 'genero',
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

    const peticionGet = async () => {
        await axios
            .get(backend_todosLosUsuarios)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", "Error al obtener la lista de usuarios", "error");
            });
    };

    const cargarUsuariosMasculinos = async () => {
        await axios
            .get(backend_UsuariosMasculinos)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", "Error al obtener la lista de usuarios masculinos", "error");
            });
    };

    const cargarUsuariosFemeninos = async () => {
        await axios
            .get(backend_UsuariosFemeninos)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", "Error al obtener la lista de usuarios femeninos", "error");
            });
    };

    const cargarUsuariosActivos = async () => {
        await axios
            .get(backend_UsuariosActivos)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", "Error al obtener la lista de usuarios activos", "error");
            });
    };

    const cargarUsuariosInactivos = async () => {
        await axios
            .get(backend_UsuariosInactivos)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", "Error al obtener la lista de usuarios inactivos", "error");
            });
    };

    const cargarUsuariosAdmin = async () => {
        await axios
            .get(backend_UsuariosAdmin)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", "Error al obtener la lista de usuarios administrador", "error");
            });
    };

    const cargarUsuariosUser = async () => {
        await axios
            .get(backend_UsuariosUser)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", "Error al obtener la lista de usuarios de rol user", "error");
            });
    };

    const downloadPdf = (dataSourceToPdf) => {

        const orientation = "landscape"; // portrait or landscape
        const doc = new jsPDF(orientation);
        var today = moment().format("dddd, MMMM D YYYY");

        doc.text("Usuarios registrados - " + today, 20, 10);

        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: dataSourceToPdf,
        });

        doc.save("Reporte de usuarios - crudAPP.pdf");

    };

    const downloadExcel=()=>{
        const newData=data.map(row=>{
          delete row.tableData
          return row
        })
        const workSheet=XLSX.utils.json_to_sheet(newData)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook,workSheet,"Usuarios")
        //Binary string
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
        //Download
        XLSX.writeFile(workBook,"Reporte de usuarios - crudAPP.xlsx")
      }

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Reporte de usuarios | crudAPP™</title>
                </Helmet>

                <Title level={2}>Reporte de Usuarios</Title>

                <Breadcrumb>
                    <Breadcrumb.Item>Reportes</Breadcrumb.Item>
                    <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
                </Breadcrumb>

                <Divider />

                <Title level={5}>Filtros:</Title>

                <Row gutter={16}>

                    <Col span={6}>

                        <Button type="primary" onClick={() => { peticionGet() }}>
                            Mostrar todos
                        </Button>

                    </Col>

                    <Col span={6}>

                        <Button type="primary" onClick={() => { cargarUsuariosMasculinos() }}>
                            Masculino
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={() => { cargarUsuariosFemeninos() }}>
                            Femenino
                        </Button>

                    </Col>

                    <Col span={6}>

                        <Button type="primary" onClick={() => { cargarUsuariosActivos() }}>
                            Activo
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={() => { cargarUsuariosInactivos() }}>
                            Inactivo
                        </Button>

                    </Col>

                    <Col span={6}>

                        <Button type="primary" onClick={() => { cargarUsuariosAdmin() }}>
                            Administrador
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={() => { cargarUsuariosUser() }}>
                            Usuario
                        </Button>

                    </Col>

                </Row>

                <br />
                <br />

                <Title level={5}>

                    <Button onClick={() => { downloadPdf(data) }}>
                        <FilePdfOutlined />
                        Exportar en PDF
                    </Button>
                    &nbsp;&nbsp;&nbsp;

                    <Button>
                        <CSVLink data={data} filename={"Reporte de usuarios - crudAPP"}>Exportar en CSV</CSVLink>
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={() => { downloadExcel() }}>
                        <FilePdfOutlined />
                        Exportar en Excel
                    </Button>

                </Title>

                <Table
                    columns={columns}
                    scroll={{ x: 2000, y: 500 }}
                    dataSource={data}
                    pagination={{
                        defaultPageSize: 10,
                        pageSizeOptions: ['20', '40', '60', '80', '100'],
                        showSizeChanger: true,
                    }}
                    bordered
                    rowKey={'idusuario'}
                    loading={false}
                />

            </HelmetProvider>
        </div >
    )
}