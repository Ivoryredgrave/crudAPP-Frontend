import React, { useState, useEffect } from "react";
import {
    Typography, Divider, Breadcrumb, Table,
    Space, Button, Input, Modal, Form, Radio,
} from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { backend_todosLosUsuarios, backend_usuarios } from "../../local";
import { UserAddOutlined, EditOutlined } from '@ant-design/icons';
import MaskedInput from 'react-text-mask';

export const Usuarios = () => {

    const { Title } = Typography;
    const { Item } = Form;
    const [data, setData] = useState([]);
    const [ModalInsertar, setModalInsertar] = useState(false);
    const [ModalEditar, setModalEditar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        idusuario: "",
        fecha_registro: "",
        nombrecompleto: "",
        genero: "",
        telefono: "",
        celular: "",
        estado: "",
        nombreusuario: "",
        contrasena: "",
        usuario_insercion: "",
        usuario_actualizacion: "",
        fecha_actualizacion: "",
        tipodeusuario: "",
    });

    const deleteEmptyProperties = (obj) =>
        Object.fromEntries(Object.entries(obj).filter(([_, v]) => v?.toString().length > 0));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioSeleccionado((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!ModalInsertar);
    };

    const abrirCerrarModalEditar = () => {
        setModalEditar(!ModalEditar);
    }

    const seleccionarUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
        abrirCerrarModalEditar();
    }

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
            render(text, estado) {
                return {
                  props: {
                    style: { background: (text) === "Activo" ? "#00991E" : "#F5AB56" }
                  },
                  children: <div>{text}</div>
                };
              },
            dataIndex: 'estado',
            filters: [
                {
                    text: 'Activo',
                    value: 'Activo',
                },
                {
                    text: 'Inactivo',
                    value: 'Inactivo',
                },
            ],
            onFilter: (value, record) => record.estado.indexOf(value) === 0,
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

        {
            title: 'Acciones',
            key: 'action',
            fixed: 'right',
            render: (fila) => (
                <Space size="middle" >
                    <Button size="large" type="primary" onClick={() => seleccionarUsuario(fila)}>
                        <EditOutlined />
                        Modificar
                    </Button>
                </Space>
            ),
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

    const peticionPut = async () => {
        const {
            nombrecompleto,
            genero,
            telefono,
            celular,
            tipodeusuario,
            contrasena,
            estado,
        } = usuarioSeleccionado;

        const userForUpdate = {
            nombrecompleto,
            genero,
            telefono,
            celular,
            usuario_actualizacion:
                sessionStorage.getItem("nombreusuario")?.toUpperCase() ||
                localStorage.getItem("nombreusuario")?.toUpperCase(),
            tipodeusuario,
            contrasena: contrasena?.length > 0 ? contrasena : undefined,
            estado,
        };

        if (usuarioSeleccionado?.contrasena !== usuarioSeleccionado['repeat-password']) {
            Swal.fire("Contraseñas no coinciden", "Las contraseñas ingresadas NO son iguales, por favor revise e intente nuevamente", "error");
            return;
        } else {
            delete usuarioSeleccionado['repeat-password']
        }

        await axios
            .put(backend_usuarios + "/" + usuarioSeleccionado?.idusuario, {
                user: deleteEmptyProperties(userForUpdate),
            })
            .then((response) => {
                if (response.data.rowsInserted > 0) {
                    Swal.fire("Registro actualizado", "Se ha actualizado el registro", "success");
                    peticionGet();
                    abrirCerrarModalEditar();
                } else {
                    Swal.fire("Error al actualizar", "Ha ocurrido un error al actualizar el registro", "error");
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error al actualizar", "Ha ocurrido un error al actualizar el registro", "error");
            });
    };

    const peticionPost = async () => {

        if (usuarioSeleccionado?.contrasena !== usuarioSeleccionado['repeat-password']) {
            Swal.fire("Contraseñas no coinciden", "Las contraseñas ingresadas NO son iguales, por favor revise e intente nuevamente", "error");
            return;
        } else {
            delete usuarioSeleccionado['repeat-password']
        }

        delete usuarioSeleccionado?.idusuario;
        usuarioSeleccionado.estado = "Activo";

        usuarioSeleccionado.usuario_insercion =
            sessionStorage.getItem("nombreusuario")?.toUpperCase() ||
            localStorage.getItem("nombreusuario")?.toUpperCase();

        await axios
            .post(backend_usuarios, {
                newUser: deleteEmptyProperties(usuarioSeleccionado),
            })
            .then((response) => {
                const data = response?.data;
                if (data.code === "ER_DUP_ENTRY") {
                    Swal.fire("Nombre duplicado", "Este registro ya existe", "error");
                    return;
                }

                if (data.rowsInserted > 0) {
                    Swal.fire("Éxito al guardar", "Se ha creado el nuevo registro", 'success');
                    peticionGet();
                    abrirCerrarModalInsertar();
                } else {
                    console.log(response);
                    Swal.fire("Error al guardar", "Ha ocurrido un error al crear el nuevo registro", "error");
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error al guardar", "Ha ocurrido un error al crear el nuevo registro", "error");
            });
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div>
            <HelmetProvider>

                <Helmet>
                    <title>Usuarios | crudAPP™</title>
                </Helmet>

                <Title level={2}>Usuarios registrados</Title>

                <Breadcrumb>
                    <Breadcrumb.Item>Parámetros</Breadcrumb.Item>
                    <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
                </Breadcrumb>

                <Divider />

                <Button size="large" type="primary" onClick={abrirCerrarModalInsertar}>
                    <UserAddOutlined /> Añadir usuario
                </Button>

                <Modal title="Añadir usuario"
                    visible={ModalInsertar}
                    destroyOnClose={true}
                    centered
                    onCancel={abrirCerrarModalInsertar}
                    footer={[
                        <Button size="large" type="primary" form="formulario-usuario" key="submit" htmlType="submit">Añadir</Button>,
                        <Button size="large" onClick={abrirCerrarModalInsertar}>Cancelar</Button>
                    ]}
                >

                    <Form name="formulario-usuario"
                        onFinish={peticionPost}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Nombre completo"
                            name="nombrecompleto"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >
                            <Input
                                onChange={handleChange}
                                name="nombrecompleto"
                                showCount maxLength={50} />
                        </Form.Item>

                        <Form.Item
                            label="Tipo de usuario"
                            name="tipodeusuario"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >

                            <Radio.Group
                                name="tipodeusuario"
                                onChange={handleChange}>
                                <Radio value="Administrador">Administrador</Radio>
                                <Radio value="Usuario">Usuario</Radio>
                            </Radio.Group>

                        </Form.Item>

                        <Form.Item
                            label="Teléfono"
                            name="telefono"
                        >
                            <MaskedInput
                                style={{ width: '100%' }}
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                name="telefono"
                                onChange={handleChange}
                                showMask
                            />
                        </Form.Item>

                        <Form.Item
                            label="Celular"
                            name="celular"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >
                            <MaskedInput
                                style={{ width: '100%' }}
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                name="celular"
                                onChange={handleChange}
                                showMask
                            />
                        </Form.Item>

                        <Form.Item
                            label="Nombre de usuario"
                            name="nombreusuario"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >
                            <Input onChange={handleChange}
                                name="nombreusuario"
                                showCount maxLength={45} />
                        </Form.Item>

                        <Form.Item
                            label="Contraseña"
                            name="contrasena"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >
                            <Input.Password
                                onChange={handleChange}
                                name="contrasena"
                                showCount maxLength={100}
                                type="password"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Repetir contraseña"
                            name="repeat-password"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >
                            <Input.Password
                                onChange={handleChange}
                                name="repeat-password"
                                showCount maxLength={100}
                                type="password"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Genero"
                            name="genero"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >

                            <Radio.Group
                                name="genero"
                                onChange={handleChange}>
                                <Radio value="Masculino">Masculino</Radio>
                                <Radio value="Femenino">Femenino</Radio>
                            </Radio.Group>

                        </Form.Item>

                    </Form>

                </Modal>

                <Modal title="Modificar usuario"
                    visible={ModalEditar}
                    destroyOnClose={true}
                    centered
                    onCancel={abrirCerrarModalEditar}
                    footer={[
                        <Button size="large" type="primary" form="formulario-usuario-editar" key="submit" htmlType="submit">Modificar</Button>,
                        <Button size="large" onClick={abrirCerrarModalEditar}>Cancelar</Button>
                    ]}
                >

                    <Form name="formulario-usuario-editar"
                        onFinish={peticionPut}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        autoComplete="off"
                    >

                        <Item
                            label="Nombre completo"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >
                            <Input
                                onChange={handleChange}
                                name="nombrecompleto"
                                value={usuarioSeleccionado && usuarioSeleccionado.nombrecompleto}
                                showCount maxLength={50} />
                        </Item>

                        <Item
                            label="Tipo de usuario"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >

                            <Radio.Group
                                name="tipodeusuario"
                                onChange={handleChange}
                                value={usuarioSeleccionado && usuarioSeleccionado.tipodeusuario}
                            >
                                <Radio value="Administrador">Administrador</Radio>
                                <Radio value="Usuario">Usuario</Radio>
                            </Radio.Group>

                        </Item>

                        <Item
                            label="Teléfono"
                        >
                            <MaskedInput
                                value={usuarioSeleccionado && usuarioSeleccionado.telefono}
                                style={{ width: '100%' }}
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                name="telefono"
                                onChange={handleChange}
                                showMask
                            />
                        </Item>

                        <Item
                            label="Celular"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >
                            <MaskedInput
                                value={usuarioSeleccionado && usuarioSeleccionado.celular}
                                style={{ width: '100%' }}
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                name="celular"
                                onChange={handleChange}
                                showMask
                            />
                        </Item>

                        <Item
                            label="Contraseña (opcional)"
                            name="contrasena">
                            <Input.Password
                                onChange={handleChange}
                                name="contrasena"
                                showCount maxLength={100}
                                type="password"
                            />
                        </Item>

                        <Item
                            label="Repetir contraseña"
                            name="repeat-password">
                            <Input.Password
                                onChange={handleChange}
                                name="repeat-password"
                                showCount maxLength={100}
                                type="password"
                            />
                        </Item>

                        <Item
                            label="Genero"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Este campo es requerido!',
                                },
                            ]}
                        >

                            <Radio.Group
                                name="genero"
                                onChange={handleChange}
                                value={usuarioSeleccionado && usuarioSeleccionado.genero}>
                                <Radio value="Masculino">Masculino</Radio>
                                <Radio value="Femenino">Femenino</Radio>
                            </Radio.Group>

                        </Item>

                    </Form>

                </Modal>

                <Table
                    columns={columns}
                    scroll={{ x: 2000, y: 500 }}
                    dataSource={data}
                    pagination={{
                        position: ["topRight"],
                        defaultPageSize: 20,
                        pageSizeOptions: ['20', '40', '60', '80', '100'],
                        showSizeChanger: true,
                    }}
                    bordered
                    rowKey={'idusuario'}
                    loading={false}
                />

            </HelmetProvider>
        </div>
    )
}