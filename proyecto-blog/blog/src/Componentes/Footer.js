import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde React Router
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <p className="mb-0">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
                    </Col>
                    <Col md={6}>
                        <ul className="list-unstyled d-flex justify-content-end mb-0">
                            <li className="mx-2">
                                <Link to="/facebook" className="text-light">Facebook</Link> {/* Usar Link para enlace a Facebook */}
                            </li>
                            <li className="mx-2">
                                <Link to="/twitter" className="text-light">Twitter</Link> {/* Usar Link para enlace a Twitter */}
                            </li>
                            <li className="mx-2">
                                <Link to="/instagram" className="text-light">Instagram</Link> {/* Usar Link para enlace a Instagram */}
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
