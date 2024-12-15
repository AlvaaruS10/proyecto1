import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./conexion.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/posts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).send("Error al obtener los posts");
  }
});

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;

   if (!titulo || !url || !descripcion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const query =
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
    const values = [titulo, url, descripcion];
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al agregar el post:", error);
    res.status(500).send("Error al agregar el post");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


