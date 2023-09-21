import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css";

const Login = ({ setIsAuthenticated }) => {
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/login", {
                correo_electronico: correoElectronico,
                contrasena: contrasena,
            });
            if (res.status === 200) {
                setIsAuthenticated(true);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <div className="form-container">
                        <h2>Iniciar sesión</h2>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="correoElectronico">
                                <Form.Label>Correo Electrónico:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={correoElectronico}
                                    onChange={(e) => setCorreoElectronico(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="contrasena">
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Iniciar sesión
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

