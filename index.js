const express = require('express');
const app = express();
const PORT = 3000;

// Middleware necesario para que el servidor entienda datos en formato JSON (para POST y PUT)
app.use(express.json());

// Array de objetos en memoria (No se usa base de datos, se reinicia con el servidor)
let estudiantes = [
    { id: 1, nombre: "Alan Turing", carrera: "Ciencias de la Computación" },
    { id: 2, nombre: "Ada Lovelace", carrera: "Ingeniería de Software" },
    { id: 3, nombre: "Grace Hopper", carrera: "Sistemas Informáticos" }
];

// ==========================================
//          ENDPOINTS REQUERIDOS
// ==========================================

// 1. GET ALL: Obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
    res.json(estudiantes);
});

// 2. GET BY ID: Obtener un estudiante por su ID único
app.get('/estudiantes/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id);
    const estudiante = estudiantes.find(e => e.id === idBuscar);
    
    if (!estudiante) {
        return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    res.json(estudiante);
});

// 3. POST: Agregar un nuevo estudiante
app.post('/estudiantes', (req, res) => {
    const { nombre, carrera } = req.body;
    
    // Validación simple
    if (!nombre || !carrera) {
        return res.status(400).json({ mensaje: "El nombre y la carrera son obligatorios" });
    }

    // Generar un ID autoincremental básico
    const nuevoId = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1;
    
    const nuevoEstudiante = {
        id: nuevoId,
        nombre,
        carrera
    };
    
    estudiantes.push(nuevoEstudiante);
    res.status(201).json(nuevoEstudiante);
});

// 4. PUT: Actualizar los datos de un estudiante por su ID
app.put('/estudiantes/:id', (req, res) => {
    const idModificar = parseInt(req.params.id);
    const { nombre, carrera } = req.body;
    
    const index = estudiantes.findIndex(e => e.id === idModificar);
    
    if (index === -1) {
        return res.status(404).json({ mensaje: "Estudiante no encontrado para actualizar" });
    }
    
    if (!nombre || !carrera) {
        return res.status(400).json({ mensaje: "El nombre y la carrera son obligatorios para actualizar" });
    }

    // Reemplazar los datos manteniendo el ID original
    estudiantes[index] = { id: idModificar, nombre, carrera };
    res.json(estudiantes[index]);
});

// 5. DELETE: Eliminar un estudiante por su ID
app.delete('/estudiantes/:id', (req, res) => {
    const idEliminar = parseInt(req.params.id);
    const index = estudiantes.findIndex(e => e.id === idEliminar);
    
    if (index === -1) {
        return res.status(404).json({ mensaje: "Estudiante no encontrado para eliminar" });
    }
    
    // Remover del array
    const eliminado = estudiantes.splice(index, 1);
    res.json({ mensaje: "Estudiante eliminado exitosamente", estudiante: eliminado[0] });
});

// Iniciar el servidor local
app.listen(PORT, () => {
    console.log(`Servidor de la tarea corriendo en http://localhost:${PORT}`);
});
