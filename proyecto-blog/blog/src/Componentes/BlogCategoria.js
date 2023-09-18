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

  return (
    <Container>
      <Row Row xs={1} md={2} lg={2} className="g-4">
        <h2 className="text-center">{categoria}</h2>
        {blogs.map((blog) => (
          <Col md={8} key={blog.id}>
            <section>
              <article>
                <h3 className="text-center">{blog.nombre}</h3>
                <img src={blog.imagen_url} alt={blog.nombre} className="img-fluid card-image blog-image" />
                <Button onClick={() => navigate(`/blogs/detalle/${blog.id}`)}>Ver más</Button>
              </article>
            </section>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BlogCategoria;