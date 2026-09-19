const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/rectangulo', (req, res) => {
  const base = Number(req.query.base);
  const altura = Number(req.query.altura);

  if (!base || !altura || base <= 0 || altura <= 0) {
    return res.status(400).json({
      error: 'Base y altura deben ser números mayores a 0'
    });
  }

  const perimetro = 2 * (base + altura);
  const superficie = base * altura;
  const esCuadrado = base === altura;

  return res.json({
    base,
    altura,
    perimetro,
    superficie,
    esCuadrado
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});