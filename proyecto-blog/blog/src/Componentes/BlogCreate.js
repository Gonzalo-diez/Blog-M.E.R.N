import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BlogCreate({ isAuthenticated }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleAgregarBlog = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      console.log("Debes estar autenticado para agregar productos.");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8800/agregarBlogs", {
        nombre,
        categoria,
        descripcion,
        imagen_url: url
      });

      console.log(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <Form>
        <h2 className="text-center">Agregar Blog</h2>
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleAgregarBlog}>
          Crear Blog
        </Button>
      </Form>
    </Container>
  );
}

export default BlogCreate;