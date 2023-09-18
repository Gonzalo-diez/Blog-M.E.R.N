import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          console.log("ID no válido");
          return;
        }

        // Haciendo una solicitud GET al servidor para obtener el blog por su ID
        const res = await axios.get(`http://localhost:8800/blogs/detalle/${id}`);
        setBlog(res.data); // Actualizando el estado con el blog obtenido
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Cargando...</p>; // Puedes mostrar un mensaje de carga mientras se obtiene el blog.
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <section>
            <article>
              <h2>{blog.nombre}</h2>
              <img src={blog.imagen_url} alt={blog.nombre} />
              <p>{blog.descripcion}</p>
            </article>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default BlogDetail;