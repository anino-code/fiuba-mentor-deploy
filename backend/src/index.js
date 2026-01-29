import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get("/api", (req, res) => {

});

//GET. /FORMULARIOS
app.get("/api/forms", (req, res) => {

});

//GET. /FORMULARIOS/<NOMBRE>
app.get("/api/forms/:id_form", (req, res) => {

});

//POST. /FORMULARIOS
app.post("/api/forms", (req, res) => {

});

//DELETE. /FORMULARIOS/<NOMBRE>
app.delete("/api/forms/:id_form", (req, res) => {

});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /FORMULARIOS/<NOMBRE>
app.put("/api/forms/:id_form", (req, res) => {

});

//GET. /USUARIOS
app.get("/api/users", (req, res) => {

});

//GET. /USUARIOS/<NOMBRE>
app.get("/users/:id_user", (req, res) => {

});

//POST. /USUARIOS
app.post("/api/users", (req, res) => {

});


//DELETE. /USUARIOS/<NOMBRE>
app.delete("/api/users/:id_user", (req, res) => {

});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /USUARIOS/<NOMBRE>
app.put("/api/users/:id_user", (req, res) => {

});

//GET. /REVIEWS
app.get("/api/reviews", (req, res) => {

});

//GET. /REVIEWS/<NOMBRE>
app.get("/api/reviews/:id_review", (req, res) => {

});

//POST. /REVIEWS
app.post("/api/reviews", (req, res) => {

});


//DELETE. /REVIEWS/<NOMBRE>
app.delete("/api/reviews/:id_review", (req, res) => {

});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /REVIEWS/<NOMBRE>
app.put("/api/reviews/:id_review", (req, res) => {

});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});