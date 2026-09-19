### 2. Archivo: `ORO, LEONEL/Ejercicio 2/README.md`

```markdown
# Ejercicio 2: Gestión de Alumnos y Estado Académico

## Descripción
API REST para la administración de un listado de alumnos y sus notas, con cálculo automático del promedio y determinación de la condición académica.

## Decisiones de Diseño y Fundamentación Técnicas
* **Arquitectura de Recurso:** Se estructuraron los endpoints bajo el estándar RESTful utilizando `/api/alumnos` para listar/crear y `/api/alumnos/:id` para consultar, actualizar o eliminar registros específicos.
* **Campos Derivados Dinámicos:** El arreglo en memoria conserva únicamente la estructura base (`id`, `nombre`, `notas`). El `promedio` y la `condición` (*promocionado*, *aprobado*, *reprobado*) se calculan de forma dinámica en la respuesta para garantizar la consistencia de los datos y evitar redundancia.
* **Control de Unicidad:** Se valida que no puedan registrarse ni actualizarse alumnos con nombres duplicados (insensible a mayúsculas/minúsculas), retornando `400 Bad Request` si la regla se viola.
* **Manejo de Errores:** Se responden los códigos de estado HTTP estándar (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request` y `404 Not Found`).

## Ejecución
```bash
node app.js
