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

    if (blogs.length === 0) {
        return (
          <Container>
            <p className="text-center mt-4">No hay blogs</p>
          </Container>
        );
    }

    return (
        <Container>
            {isAuthenticated && (
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <Button onClick={handleAgregarBlog}>Agregar algún blog?</Button>
                </div>
            )}
            <Row xs={1} md={2} lg={2} className="g-4">
                {blogs.map((blog) => (
                    <Col key={blog._id} className="mt-5">
                        <section>
                            <article>
                                <h2>{blog.nombre}</h2>
                                <p>{blog.categoria}</p>
                                <img
                                    src={blog.imagen_url}
                                    alt={blog.nombre}
                                    className="img-fluid card-image blog-image"
                                />
                            </article>
                            <Button onClick={() => navigate(`/blogs/detalle/${blog._id}`)} className="mt-2">Ver detalles</Button>
                            {isAuthenticated && (
                                <div>
                                    <Button variant="warning" onClick={() => handleActualizarBlog(blog._id)} className="mt-2">Actualizar</Button>
                                    <Button variant="danger" onClick={() => handleEliminarBlog(blog._id)} className="mt-2">Eliminar</Button>
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