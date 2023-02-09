import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, Col,
  Row, Card, Typography, Divider, Avatar
} from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, LockFilled } from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from "axios";
import Swal from "sweetalert2";
import { getUserId } from "../../utils/sessionUtils";
import { backend_loginusuarios } from "../../API/httpRequests";

export default function Login(props) {

  const { Title, Text } = Typography;

  const [form, setForm] = useState({
    nombreusuario: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const iniciarSesion = async () => {

    await axios
      .get(
        backend_loginusuarios + `?usuario=${form.nombreusuario}&contrasena=${form.contrasena}`
      )
      .then((response) => {
        const { data } = response;
        if (data.length > 0) {
          let respuesta = data[0];
          const {
            idusuario,
            nombreusuario,
            nombrecompleto,
            tipodeusuario,
          } = respuesta;

          sessionStorage.setItem("idusuario", idusuario);
          sessionStorage.setItem("nombreusuario", nombreusuario?.toUpperCase());
          sessionStorage.setItem("nombrecompleto", nombrecompleto);
          sessionStorage.setItem("tipodeusuario", tipodeusuario);

          props.history.push("/inicio");

        } else {
          Swal.fire("Error", "Usuario y/o contraseña incorrectos.", "error");
        }

      })
      .catch((error) => {
        console.log(error);
        Swal.fire("¡Ups! Algo ha salido mal", "Lo sentimos, en este momento no podemos procesar su solicitud debido a un problema técnico en nuestro servidor. Por favor, póngase en contacto con nuestro equipo de soporte para obtener ayuda.", "error");
      });
  };

  useEffect(() => {
    if (getUserId()) {
      props.history.push("/inicio");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='background-login'>
      <HelmetProvider>

        <Helmet>
          <title>Iniciar sesión | crudAPP™</title>
        </Helmet>

        <Row type="flex" align="middle" justify="center" style={{ minHeight: '100vh' }}>

          <Col xs={22} sm={20} md={12} lg={10}>

            <Card justify="center" align="middle" bordered={true} className="login">

              <Avatar style={{ backgroundColor: '#87d068' }} size={64}><LockFilled /></Avatar>
              <Title level={2}>Iniciar sesión</Title>

              <Divider />

              <Form name="formulario-login"

                onFinish={iniciarSesion}

                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                autoComplete="off"
              >

                <Form.Item
                  label="Nombre de usuario"
                  name="nombreusuario"
                  rules={[
                    {
                      required: true,
                      message: '¡Por favor escribe un nombre de usuario!',
                    },
                  ]}
                >
                  <Input
                    onChange={handleChange}
                    name="nombreusuario"
                    //showCount maxLength={45}
                    prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="contrasena"
                  rules={[
                    {
                      required: true,
                      message: '¡Por favor escribe una contraseña!',
                    },
                  ]}
                >
                  <Input.Password
                    onChange={handleChange}
                    name="contrasena"
                    //showCount maxLength={100}
                    prefix={<LockOutlined />}
                    type="password"
                  />
                </Form.Item>

                <Form.Item wrapperCol={{
                  offset: 8,
                  span: 16,
                }}>
                  <Button size='large' type="primary" htmlType="submit">
                    <LoginOutlined /> Acceder
                  </Button>
                </Form.Item>

              </Form>

              <Divider />
            
              <Text> crudAPP™ {new Date().getFullYear()}</Text>

            </Card>
          </Col>
        </Row>
      </HelmetProvider>
    </div>
  );
};