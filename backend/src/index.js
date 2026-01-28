import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get("/", (req, res) => {

});

//GET. /FORMULARIOS
app.get("/formularios", (req, res) => {

});

//GET. /FORMULARIOS/<NOMBRE>
app.get("/formularios/:id_formulario", (req, res) => {

});

//POST. /FORMULARIOS
app.post("/formularios", (req, res) => {

});

//DELETE. /FORMULARIOS/<NOMBRE>
app.delete("/formularios/:id_formulario", (req, res) => {

});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /FORMULARIOS/<NOMBRE>
app.put("/formularios/:id_formulario", (req, res) => {

});

//GET. /USUARIOS
app.get("/usuarios", (req, res) => {

});

//GET. /USUARIOS/<NOMBRE>
app.get("/usuarios/:id_usuario", (req, res) => {

});

//POST. /USUARIOS
app.post("/usuarios", (req, res) => {

});


//DELETE. /USUARIOS/<NOMBRE>
app.delete("/usuarios/:id_usuario", (req, res) => {

});

//si uso pathch no necesito mandarle todo para actualizar, con put si
//PUT. /USUARIOS/<NOMBRE>
app.put("/usuarios/:id_usuario", (req, res) => {

});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});