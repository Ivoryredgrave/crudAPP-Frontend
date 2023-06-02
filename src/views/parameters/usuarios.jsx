import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Space,
  Button,
  Input,
  Modal,
  Form,
  Radio,
} from "antd";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SearchOutlined } from "@ant-design/icons";
import { UserAddOutlined, EditOutlined } from "@ant-design/icons";
import MaskedInput from "react-text-mask";
import {
  peticionGetUsuarios,
  peticionPostUsuarios,
  peticionPutUsuarios,
} from "../../API/apiUsuarios";
import { migajaDePan, TablaAntDesign } from "../../components/components";
import { useForm } from "antd/lib/form/Form";

export const Usuarios = () => {
  const [formEditar] = useForm();
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
  };

  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    abrirCerrarModalEditar();
  };

  const columns = [
    {
      title: "ID usuario",
      dataIndex: "idusuario",
      key: "idusuario",
    },
    {
      title: "Tipo de usuario",
      dataIndex: "tipodeusuario",
      key: "tipodeusuario",
      filters: [
        {
          text: "Administrador",
          value: "Administrador",
        },
        {
          text: "Usuario",
          value: "Usuario",
        },
      ],
      onFilter: (value, record) => record.tipodeusuario.indexOf(value) === 0,
    },
    {
      title: "Nombre completo",
      dataIndex: "nombrecompleto",
      key: "nombrecompleto",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              padding: 8,
            }}
          >
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
        return record.nombrecompleto
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Género",
      dataIndex: "genero",
      key: "genero",
      filters: [
        {
          text: "Masculino",
          value: "Masculino",
        },
        {
          text: "Femenino",
          value: "Femenino",
        },
      ],
      onFilter: (value, record) => record.genero.indexOf(value) === 0,
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      filters: [
        { text: "Activo", value: "Activo" },
        { text: "Inactivo", value: "Inactivo" },
      ],
      onFilter: (value, record) => record.estado.indexOf(value) === 0,
      render: (text) => {
        let color = text === "Activo" ? "#1dc43e" : "#F5AB56";
        return (
          <div className="cell" style={{ background: color }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Nombre de usuario",
      dataIndex: "nombreusuario",
      key: "nombreusuario",
    },
    {
      title: "Fecha de registro",
      dataIndex: "fecha_registro",
      key: "fecha_registro",
    },
    {
      title: "Añadido por",
      dataIndex: "usuario_insercion",
      key: "usuario_insercion",
    },
    {
      title: "Actualizado por",
      dataIndex: "usuario_actualizacion",
      key: "usuario_actualizacion",
    },
    {
      title: "Fecha de actualización",
      dataIndex: "fecha_actualizacion",
      key: "fecha_actualizacion",
    },
    {
      title: "Acciones",
      key: "action",
      fixed: "right",
      render: (fila) => (
        <Space size="middle">
          <Button
            size="large"
            type="primary"
            onClick={() => {
              seleccionarUsuario(fila);
              formEditar.setFieldsValue(fila);
            }}
          >
            <EditOutlined />
            Modificar
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    peticionGetUsuarios(setData);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Usuarios | WaitingSystem™</title>
        </Helmet>

        <Title level={2}>Usuarios</Title>

        {migajaDePan("Parámetros", "Usuarios")}

        <Divider />

        <Button size="large" type="primary" onClick={abrirCerrarModalInsertar}>
          <UserAddOutlined /> Añadir usuario
        </Button>

        <Modal
          title="Añadir usuario"
          visible={ModalInsertar}
          destroyOnClose={true}
          centered
          onCancel={abrirCerrarModalInsertar}
          footer={[
            <Button
              size="large"
              type="primary"
              form="formulario-usuario"
              key="submit"
              htmlType="submit"
            >
              Añadir
            </Button>,
            <Button
              key="cancelar"
              size="large"
              onClick={abrirCerrarModalInsertar}
            >
              Cancelar
            </Button>,
          ]}
        >
          <Form
            name="formulario-usuario"
            onFinish={() =>
              peticionPostUsuarios(
                usuarioSeleccionado,
                setData,
                abrirCerrarModalInsertar
              )
            }
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Form.Item
              label="Nombre completo"
              name="nombrecompleto"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Input
                onChange={handleChange}
                name="nombrecompleto"
                showCount
                maxLength={50}
              />
            </Form.Item>

            <Form.Item
              label="Tipo de usuario"
              name="tipodeusuario"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Radio.Group name="tipodeusuario" onChange={handleChange}>
                <Radio value="Administrador">Administrador</Radio>
                <Radio value="Usuario">Usuario</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Teléfono" name="telefono">
              <MaskedInput
                style={{ width: "100%" }}
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
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
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <MaskedInput
                style={{ width: "100%" }}
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
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
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Input
                onChange={handleChange}
                name="nombreusuario"
                autoComplete="username"
                showCount
                maxLength={45}
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="contrasena"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Input.Password
                onChange={handleChange}
                name="contrasena"
                autoComplete="new-password"
                showCount
                maxLength={100}
                type="password"
              />
            </Form.Item>

            <Form.Item
              label="Repetir contraseña"
              name="repeatPassword"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Input.Password
                onChange={handleChange}
                name="repeatPassword"
                autoComplete="new-password"
                showCount
                maxLength={100}
                type="password"
              />
            </Form.Item>

            <Form.Item
              label="Genero"
              name="genero"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Radio.Group name="genero" onChange={handleChange}>
                <Radio value="Masculino">Masculino</Radio>
                <Radio value="Femenino">Femenino</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Modificar usuario"
          visible={ModalEditar}
          destroyOnClose={true}
          centered
          onCancel={abrirCerrarModalEditar}
          footer={[
            <Button
              size="large"
              type="primary"
              form="formulario-usuario-editar"
              key="submit"
              htmlType="submit"
            >
              Modificar
            </Button>,
            <Button
              key="cancelar"
              size="large"
              onClick={abrirCerrarModalEditar}
            >
              Cancelar
            </Button>,
          ]}
        >
          <Form
            name="formulario-usuario-editar"
            onFinish={() =>
              peticionPutUsuarios(
                usuarioSeleccionado,
                setData,
                abrirCerrarModalEditar
              )
            }
            labelCol={{
              span: 8,
            }}
            form={formEditar}
            wrapperCol={{
              span: 16,
            }}
          >
            <Item
              label="Nombre completo"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Input
                onChange={handleChange}
                name="nombrecompleto"
                value={
                  usuarioSeleccionado && usuarioSeleccionado.nombrecompleto
                }
                showCount
                maxLength={50}
              />
            </Item>

            <Item
              label="Tipo de usuario"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
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

            <Item label="Teléfono">
              <MaskedInput
                value={usuarioSeleccionado && usuarioSeleccionado.telefono}
                style={{ width: "100%" }}
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
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
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <MaskedInput
                value={usuarioSeleccionado && usuarioSeleccionado.celular}
                style={{ width: "100%" }}
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                name="celular"
                autoComplete="tel"
                onChange={handleChange}
                showMask
              />
            </Item>

            <Item label="Contraseña (opcional)" name="contrasena">
              <Input.Password
                onChange={handleChange}
                name="contrasena"
                autoComplete="new-password"
                showCount
                maxLength={100}
                type="password"
              />
            </Item>

            <Item label="Repetir contraseña" name="repeatPassword">
              <Input.Password
                onChange={handleChange}
                name="repeatPassword"
                autoComplete="new-password"
                showCount
                maxLength={100}
                type="password"
              />
            </Item>

            <Item
              label="Estado"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Radio.Group
                name="estado"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.estado}
              >
                <Radio value="Activo">Activo</Radio>
                <Radio value="Inactivo">Inactivo</Radio>
              </Radio.Group>
            </Item>

            <Item
              label="Genero"
              rules={[
                {
                  required: true,
                  message: "¡Este campo es requerido!",
                },
              ]}
            >
              <Radio.Group
                name="genero"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.genero}
              >
                <Radio value="Masculino">Masculino</Radio>
                <Radio value="Femenino">Femenino</Radio>
              </Radio.Group>
            </Item>
          </Form>
        </Modal>

        {TablaAntDesign(columns, data, handleChange, "idusuario")}
      </HelmetProvider>
    </>
  );
};
