import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

let students = [{
    id: 1, 
    name: 'Henry', 
    lastname: 'Alvarenga',
     age: 40,
    email: 'henry@gmail.com',
    phone:'12345678',
address: 'Jocoro',
country: 'El Salvador',
isActive: true,
course: ['Transformacion Digital para la Docencia Tecnica 3']
}];


app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) {
        return res.status(404).json({message: "estudiante no encontrado"});
    }
    res.status(200).json(student);
});


app.post('/students', (req, res) => {
    const {
        name,
        lastname,
        age,
        email,
        phone,
        address,
        country,
        isActive,
        course} = req.body;

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        lastname,
        age,
        email,
        phone,
        address,
        country,
        isActive,
        course
    };
    students.push(newStudent);
    return res.status(201).json({message: "estudiante creado con exito", student: newStudent});
});


app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({message: "estudiante no encontrado"});
    }
    students[studentIndex] = {
        id: studentId,
        ...req.body
    };
    return res.status(200).json({message: "estudiante actualizado con exito", student: students[studentIndex]});
});


app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentExists = students.some(s => s.id === studentId);
    if (!studentExists) {
        return res.status(404).json({message: "estudiante no encontrado"});
    }
    students = students.filter(s => s.id !== studentId);
    return res.status(200).json({message: `estudiante con ID ${studentId} eliminado con exito`});
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}✌️✌️✌️`); 
});