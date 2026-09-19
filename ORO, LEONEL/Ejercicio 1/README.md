# Ejercicio 1: Cálculo de Parámetros de Rectángulo

## Descripción
API REST desarrollada en Express.js para calcular el área y el perímetro de un rectángulo a partir de las dimensiones provistas por el cliente.

## Decisiones de Diseño y Fundamentación Técnicas
* **Selección del Método HTTP:** Se utilizó el verbo `POST` (`/rectangulo`) para enviar las dimensiones (`base` y `altura`) dentro del cuerpo de la petición (JSON), permitiendo procesar datos estructurados.
* **Validación de Datos:** Se implementaron validaciones estrictas en el servidor para garantizar que ambos valores sean numéricos y mayores a cero, respondiendo con un estado `400 Bad Request` en caso de datos inválidos.
* **Respuesta Estructurada:** Ante una solicitud válida, la API retorna un estado `200 OK` con los resultados calculados explícitamente en un objeto JSON (`area` y `perimetro`).

## Ejecución
```bash
node app.js
