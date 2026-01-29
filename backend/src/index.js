import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get("/api", (req, res) => {
  res.json({ status: 'OK'});
});

//GET. /USUARIOS
app.get("/api/users", (req, res) => {
  res.json({ status: 'OK'});
});

//GET. /USUARIOS/<NOMBRE>
app.get("/users/:id_user", (req, res) => {
  res.json({ status: 'OK'});
});

//POST. /USUARIOS
app.post("/api/users", (req, res) => {
  res.json({ status: 'OK'});
});


//DELETE. /USUARIOS/<NOMBRE>
app.delete("/api/users/:id_user", (req, res) => {
  res.json({ status: 'OK'});
});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /USUARIOS/<NOMBRE>
app.put("/api/users/:id_user", (req, res) => {
  res.json({ status: 'OK'});
});

//GET. /FORMULARIOS
app.get("/api/forms", async (req, res) => {
  res.json({ status: 'OK'});
});

//GET. /FORMULARIOS/<NOMBRE>
app.get("/api/forms/:id_form", (req, res) => {
  res.json({ status: 'OK'});
});

//POST. /FORMULARIOS
app.post("/api/forms", (req, res) => {
  res.json({ status: 'OK'});
});

//DELETE. /FORMULARIOS/<NOMBRE>
app.delete("/api/forms/:id_form", (req, res) => {
  res.json({ status: 'OK'});
});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /FORMULARIOS/<NOMBRE>
app.put("/api/forms/:id_form", (req, res) => {
  res.json({ status: 'OK'});
});

//GET. /REVIEWS
app.get("/api/reviews", (req, res) => {
  res.json({ status: 'OK'});
});

//GET. /REVIEWS/<NOMBRE>
app.get("/api/reviews/:id_review", (req, res) => {
  res.json({ status: 'OK'});
});

//POST. /REVIEWS
app.post("/api/reviews", (req, res) => {
  res.json({ status: 'OK'});
});

//DELETE. /REVIEWS/<NOMBRE>
app.delete("/api/reviews/:id_review", (req, res) => {
  res.json({ status: 'OK'});
});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /REVIEWS/<NOMBRE>
app.put("/api/reviews/:id_review", (req, res) => {
  res.json({ status: 'OK'});
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});