import { Routes, Route } from "react-router-dom"
import './css/App.css';
import NavBar from './NavBar';
import Blog from "./Blog";
import BlogDetail from "./BlogDetail";
import BlogCategoria from "./BlogCategoria";
import Login from "./Login";
import Layout from "./Layout";
import BlogCreate from "./BlogCreate";
import { useState } from "react";
import BlogDelete from "./BlogDelete";
import BlogUpdate from "./BlogUpdate";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <NavBar />
      <Layout>
        <Routes>
          <Route path="/" element={<Blog isAuthenticated={isAuthenticated} />} />
          <Route path="/blogs/detalle/:id" element={<BlogDetail />} />
          <Route path="/blogs/:categoria" element={<BlogCategoria />} />
          <Route path="/agregarBlogs" element={<BlogCreate isAuthenticated={isAuthenticated} />} />
          <Route path="/blogs/borrarBlog/:id" element={<BlogDelete isAuthenticated={isAuthenticated} />} />
          <Route path="/blogs/actualizarBlog/:id" element={<BlogUpdate isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
