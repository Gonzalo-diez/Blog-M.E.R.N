import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function BlogCategoria() {
  const { categoria } = useParams()
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogCategoria = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/blogs/${categoria}`);
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogCategoria();
  }, [categoria])

  if (blogs.length === 0) {
    return (
      <Container>
        <h2 className="text-center mt-3">{categoria}</h2>
        <p className="text-center mt-4">No hay blogs de esta categoría</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="text-center mt-3">{categoria}</h2>
      <Row xs={1} md={2} lg={2} className="g-4">
        {blogs.map((blog) => (
          <Col key={blog._id} className="mt-5">
            <section>
              <article>
                <p>{blog.nombre}</p>
                <img
                  src={blog.imagen_url}
                  alt={blog.nombre}
                  className="img-fluid card-image blog-image"
                />
                <p>{blog.descripcion}</p>
              </article>
              <Button onClick={() => navigate(`/blogs/detalle/${blog._id}`)}>Ver detalles</Button>
            </section>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BlogCategoria;
