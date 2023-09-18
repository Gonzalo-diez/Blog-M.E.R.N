import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css"

function BlogUpdate({ isAuthenticated }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/blogs/detalle/${id}`);
                const blog = response.data; // No es necesario [0] si esperas un solo objeto, no un arreglo de objetos
        
                if (!blog) {
                    console.error("Blog no encontrado");
                    return;
                }
        
                setNombre(blog.nombre);
                setCategoria(blog.categoria);
                setDescripcion(blog.descripcion);
                setImagen(blog.imagen_url);
            } catch (error) {
                console.error("Error al obtener el blog:", error);
            }
        };
        fetchBlog();
    }, [id]);

    const handleActualizar = async () => {
        if (!isAuthenticated) {
            console.log("Debes estar autenticado para actualizar el blog.");
            navigate("/login");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8800/blogs/actualizarBlog/${id}`, {
                nombre,
                categoria,
                descripcion,
                imagen_url: imagen,
            });

            console.log(response.data.message);
            navigate("/");
        } catch (error) {
            console.error("Error en la actualización:", error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <Form>
                <h2 className="text-center">Actualizar Blog</h2>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="categoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="Lenguajes">Lenguajes</option>
                        <option value="Experiencias">Experiencias</option>
                        <option value="Entrevistas">Entrevistas</option>
                        <option value="Proyectos">Proyectos</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="imagen_url">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        name="imagen_url"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleActualizar}>
                    Actualizar Blog
                </Button>
            </Form>
        </Container>
    );
}

export default BlogUpdate;