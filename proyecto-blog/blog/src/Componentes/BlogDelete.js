import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BlogDelete({ isAuthenticated }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleEliminar = async () => {
        if (!isAuthenticated) {
            console.log("Debes estar autenticado para eliminar blogs.");
            navigate("/login");
            return;
        }
        try {
            await axios.delete(`http://localhost:8800/blogs/borrarBlog/${id}`);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Error al eliminar blog:", error);
        }
    };

    const handleCancelar = () => {
        navigate(`/blogs/detalle/${id}`);
    };

    return (
        <Container className="text-center">
            <h2>Eliminar Producto</h2>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <Button variant="danger" onClick={handleEliminar}>Sí, eliminar</Button>
            <Button variant="secondary" onClick={handleCancelar}>No, cancelar</Button>
        </Container>
    );
}

export default BlogDelete;
