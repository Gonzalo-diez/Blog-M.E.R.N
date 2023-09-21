import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const app = express();


// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/Blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Error de conexión a MongoDB:", err);
});

db.once("open", () => {
    console.log("Conexión a MongoDB exitosa");
});

// Define el modelo de usuario en Mongoose
const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo_electronico: String,
    contrasena: String,
});

const User = mongoose.model("User", userSchema);

const blogSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    descripcion: String,
    imagen_url: String,
});

const Blog = mongoose.model("Blog", blogSchema);



// Configuración de Passport para autenticación local
passport.use(
    new LocalStrategy(
        {
            usernameField: "correo_electronico",
            passwordField: "contrasena",
        },
        async (correo_electronico, contrasena, done) => {
            try {
                const user = await User.findOne({ correo_electronico }).exec();

                if (!user || user.contrasena !== contrasena) {
                    return done(null, false, { message: "Credenciales inválidas" });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.json(blogs);
    } catch (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para buscar blogs segun su categoria en mongodb
app.get("/blogs/:categoria", async (req, res) => {
    const categoria = req.params.categoria;

    try {
        // Utiliza el método find de Mongoose para buscar productos por categoria
        const blogs = await Blog.find({ categoria }).exec();
        return res.json(blogs);
    } catch (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para buscar blogs segun su _id en mongodb
app.get("/blogs/detalle/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const blogId = new mongoose.Types.ObjectId(id); 
  
      const blog = await Blog.findOne({ _id: blogId }).exec();
  
      if (!blog) {
        return res.status(404).json({ error: "Blog no encontrado" });
      }
  
      return res.json(blog);
    } catch (err) {
      return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para agregar blogs
app.post("/agregarBlogs", async (req, res) => {
    const {
        nombre,
        categoria,
        descripcion,
        imagen_url,
    } = req.body;

    try {
        const nuevoBlog = new Blog({
            nombre,
            categoria,
            descripcion,
            imagen_url,
        });

        await nuevoBlog.save();

        return res.json("Blog creado!!!");
    } catch (err) {
        console.error("Error al guardar el blog:", err);
        return res
            .status(500)
            .json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para realizar login
app.post("/login", (req, res, next) => {
    const { correo_electronico, contrasena } = req.body;

    if (!correo_electronico || !contrasena) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.json({ message: "Inicio de sesión exitoso", usuario: user });
        });
    })(req, res, next);
});

// Método para actualizar un blog
app.put("/blogs/actualizarBlog/:id", async (req, res) => {
    const blogId = req.params.id;
    const { nombre, categoria, descripcion, imagen_url } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                nombre,
                categoria,
                descripcion,
                imagen_url,
            },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog no encontrado" });
        }

        return res.json("Blog actualizado!");
    } catch (err) {
        console.error("Error en la actualización:", err);
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para borrar un blog
app.delete("/blogs/borrarBlog/:id", async (req, res) => {
    const blogId = req.params.id;

    try {
        const result = await Blog.deleteOne({ _id: blogId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Blog no encontrado" });
        }

        return res.json("blog eliminado!");
    } catch (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

app.listen(8800, () => {
    console.log("Backend conectado");
});