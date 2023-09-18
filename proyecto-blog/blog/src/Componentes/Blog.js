import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './css/App.css';

function Blog({ isAuthenticated }) {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:8800/");
                setBlogs(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBlogs();
    }, []);

    const handleAgregarBlog = () => {
        navigate("/agregarBlogs")
    }

    const handleActualizarBlog = async (blogId) => {
        navigate(`/blogs/actualizarBlog/${blogId}`)
    }

    const handleEliminarBlog = async (blogId) => {
        navigate(`/blogs/borrarBlog/${blogId}`)
    }

    return (
        <Container>
            {isAuthenticated && (
                <Button onClick={handleAgregarBlog}>Agregar algún blog?</Button>
            )}
            <Row xs={1} md={2} lg={2} className="g-4">
                {blogs.map((blog) => (
                    <Col key={blog._id}>
                        <section>
                            <article>
                                <h2>{blog.nombre}</h2>
                                <p>{blog.categoria}</p>
                                <img
                                    src={blog.imagen_url}
                                    alt={blog.nombre}
                                    className="img-fluid card-image blog-image"
                                />
                                <p>{blog.descripcion}</p>
                            </article>
                            <Button onClick={() => navigate(`/blogs/detalle/${blog._id}`)}>Ver detalles</Button>
                            {isAuthenticated && (
                                <div>
                                    <Button variant="warning" onClick={() => handleActualizarBlog(blog._id)}>Actualizar</Button>
                                    <Button variant="danger" onClick={() => handleEliminarBlog(blog._id)}>Eliminar</Button>
                                </div>
                            )}
                        </section>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Blog;