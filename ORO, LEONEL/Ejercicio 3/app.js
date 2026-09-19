const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Arreglo interno en memoria
let tareas = [
  { id: 1, nombre: 'Estudiar para Programacion IV', completada: false },
  { id: 2, nombre: 'Realizar el TP1 de Express', completada: true }
];

// 1. GET - Obtener todas las tareas (soporta filtro ?completada=true|false)
app.get('/api/tareas', (req, res) => {
  const { completada } = req.query;

  if (completada !== undefined) {
    if (completada !== 'true' && completada !== 'false') {
      return res.status(400).json({ error: 'El parametro "completada" debe ser "true" o "false"' });
    }
    const esCompletada = completada === 'true';
    const tareasFiltradas = tareas.filter(t => t.completada === esCompletada);
    return res.status(200).json(tareasFiltradas);
  }

  return res.status(200).json(tareas);
});

// 2. GET - Obtener una tarea por ID
app.get('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  return res.status(200).json(tarea);
});

// 3. POST - Crear una nueva tarea
app.post('/api/tareas', (req, res) => {
  const { nombre, completada = false } = req.body;

  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre de la tarea es obligatorio y debe ser un texto valido' });
  }

  if (typeof completada !== 'boolean') {
    return res.status(400).json({ error: 'El campo completada debe ser de tipo booleano (true o false)' });
  }

  // Validar unicidad del nombre (insensible a mayúsculas/minúsculas)
  const existeNombre = tareas.some(t => t.nombre.toLowerCase() === nombre.trim().toLowerCase());
  if (existeNombre) {
    return res.status(400).json({ error: 'Ya existe una tarea con ese nombre' });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
    nombre: nombre.trim(),
    completada
  };

  tareas.push(nuevaTarea);

  return res.status(201).json(nuevaTarea);
});

// 4. PUT - Modificar una tarea existente
app.put('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nombre, completada } = req.body;

  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre de la tarea es obligatorio y debe ser un texto valido' });
  }

  if (typeof completada !== 'boolean') {
    return res.status(400).json({ error: 'El campo completada debe ser de tipo booleano (true o false)' });
  }

  // Validar unicidad del nombre ignorando la tarea actual que se esta editando
  const existeNombre = tareas.some(t => t.id !== id && t.nombre.toLowerCase() === nombre.trim().toLowerCase());
  if (existeNombre) {
    return res.status(400).json({ error: 'Ya existe otra tarea con ese nombre' });
  }

  tareas[indice] = {
    id,
    nombre: nombre.trim(),
    completada
  };

  return res.status(200).json(tareas[indice]);
});

// 5. DELETE - Eliminar una tarea
app.delete('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  const existe = tareas.some(t => t.id === id);

  if (!existe) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas = tareas.filter(t => t.id !== id);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor del Ejercicio 3 iniciado en http://localhost:${PORT}`);
});