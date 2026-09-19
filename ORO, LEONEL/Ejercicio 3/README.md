---

### 3. Archivo: `ORO, LEONEL/Ejercicio 3/README.md`

```markdown
# Ejercicio 3: Administración de Tareas y Estado de Avance

## Descripción
API REST en Express.js para gestionar un listado de tareas con su correspondiente estado de finalización (`completada`).

## Decisiones de Diseño y Fundamentación Técnicas
* **Diseño del Recurso y Filtrado:** Se expone el endpoint `/api/tareas`. Para cumplir con el requerimiento de diferenciar tareas completadas de pendientes, se implementaron **Query Parameters** (`GET /api/tareas?completada=true|false`).
* **Justificación del Query Param:** Se prefirió el uso de query parameters en lugar de rutas adicionales (como `/tareas/completadas`) para mantener una interfaz REST limpia y cohesiva sobre un único recurso, permitiendo también obtener la lista completa si se omite el parámetro.
* **Reglas de Negocio:**
  * **Unicidad:** No se permite crear ni editar tareas con un nombre ya existente en el sistema.
  * **Estructura del Modelo:** Cada tarea maneja los campos `{ id, nombre, completada }`, donde `completada` es de tipo booleano.

## Ejecución
```bash
node app.js
