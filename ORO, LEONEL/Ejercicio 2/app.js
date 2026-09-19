const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Arreglo interno en memoria (no guarda ni promedio ni condicion)
let alumnos = [
  { id: 1, nombre: 'Juan Perez', notas: [7, 8, 9] },
  { id: 2, nombre: 'Maria Gomez', notas: [4, 5, 5] }
];

// Funcion auxiliar para calcular campos derivados (promedio y condicion)
function calcularInformacionAcademica(alumno) {
  const suma = alumno.notas.reduce((acc, nota) => acc + nota, 0);
  const promedio = Number((suma / alumno.notas.length).toFixed(2));

  let condicion = 'reprobado';
  if (promedio >= 8) {
    condicion = 'promocionado';
  } else if (promedio >= 6) {
    condicion = 'aprobado';
  }

  return {
    id: alumno.id,
    nombre: alumno.nombre,
    notas: alumno.notas,
    promedio,
    condicion
  };
}

// 1. GET - Obtener todos los alumnos
app.get('/api/alumnos', (req, res) => {
  const resultado = alumnos.map(calcularInformacionAcademica);
  return res.status(200).json(resultado);
});

// 2. GET - Obtener un alumno por ID
app.get('/api/alumnos/:id', (req, res) => {
  const id = Number(req.params.id);
  const alumno = alumnos.find(a => a.id === id);

  if (!alumno) {
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }

  return res.status(200).json(calcularInformacionAcademica(alumno));
});

// 3. POST - Crear un nuevo alumno
app.post('/api/alumnos', (req, res) => {
  const { nombre, notas } = req.body;

  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser un texto valido' });
  }

  if (!Array.isArray(notas) || notas.length !== 3 || !notas.every(n => typeof n === 'number' && n >= 0 && n <= 10)) {
    return res.status(400).json({ error: 'Se requieren exactamente 3 notas numericas entre 0 y 10' });
  }

  // Validar unicidad del nombre (insensible a mayusculas/minusculas)
  const existeNombre = alumnos.some(a => a.nombre.toLowerCase() === nombre.trim().toLowerCase());
  if (existeNombre) {
    return res.status(400).json({ error: 'Ya existe un alumno con ese nombre' });
  }

  const nuevoAlumno = {
    id: alumnos.length > 0 ? Math.max(...alumnos.map(a => a.id)) + 1 : 1,
    nombre: nombre.trim(),
    notas
  };

  alumnos.push(nuevoAlumno);

  return res.status(201).json(calcularInformacionAcademica(nuevoAlumno));
});

// 4. PUT - Modificar un alumno existente
app.put('/api/alumnos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nombre, notas } = req.body;

  const indice = alumnos.findIndex(a => a.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }

  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser un texto valido' });
  }

  if (!Array.isArray(notas) || notas.length !== 3 || !notas.every(n => typeof n === 'number' && n >= 0 && n <= 10)) {
    return res.status(400).json({ error: 'Se requieren exactamente 3 notas numericas entre 0 y 10' });
  }

  // Validar unicidad del nombre ignorando al alumno actual que estamos editando
  const existeNombre = alumnos.some(a => a.id !== id && a.nombre.toLowerCase() === nombre.trim().toLowerCase());
  if (existeNombre) {
    return res.status(400).json({ error: 'Ya existe otro alumno con ese nombre' });
  }

  alumnos[indice] = {
    id,
    nombre: nombre.trim(),
    notas
  };

  return res.status(200).json(calcularInformacionAcademica(alumnos[indice]));
});

// 5. DELETE - Eliminar un alumno
app.delete('/api/alumnos/:id', (req, res) => {
  const id = Number(req.params.id);
  const existe = alumnos.some(a => a.id === id);

  if (!existe) {
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }

  alumnos = alumnos.filter(a => a.id !== id);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor del Ejercicio 2 iniciado en http://localhost:${PORT}`);
});