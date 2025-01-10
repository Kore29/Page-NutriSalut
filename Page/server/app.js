const cors = require('cors');


const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());  // Habilitar CORS para todas las solicitudes
app.use(express.json());

// Función para leer datos desde el archivo JSON
function llegirDades() {
  try {
    const dadesJSON = fs.readFileSync('./data/preguntas.json', 'utf8');
    return JSON.parse(dadesJSON);
  } catch (error) {
    console.error('Error leyendo el archivo:', error);
    return [];
  }
}

function escriureDades(dades) {
  try {
    const dadesJSON = JSON.stringify(dades, null, 2);
    fs.writeFileSync('./data/preguntas.json', dadesJSON);
  } catch (error) {
    console.error('Error escribiendo el archivo:', error);
  }
}

// Crear una nueva pregunta
app.post('/preguntas', (req, res) => {
  const dades = llegirDades();
  const novaPregunta = {
    id: dades.length + 1,
    nom_opcio: req.body.nom_opcio,
    tipus_opcio: req.body.tipus_opcio,
    contigut: req.body.contigut,
    descripcio_opcio: req.body.descripcio_opcio
  };
  dades.push(novaPregunta);
  escriureDades(dades);
  res.status(201).json(novaPregunta);
});

// Obtener todas las preguntas
app.get('/preguntas', (req, res) => {
  const dades = llegirDades();
  res.json(dades);
});

// Obtener una pregunta por ID
app.get('/preguntas/:id', (req, res) => {
  const dades = llegirDades();
  const id = parseInt(req.params.id);
  const pregunta = dades.find(p => p.id === id);

  if (pregunta) {
    res.json(pregunta);
  } else {
    res.status(404).send('Pregunta no trobada');
  }
});

// Actualizar una pregunta por ID
app.put('/preguntas/:id', (req, res) => {
  const dades = llegirDades();
  const id = parseInt(req.params.id);
  const preguntaIndex = dades.findIndex(p => p.id === id);

  if (preguntaIndex !== -1) {
    dades[preguntaIndex] = {
      ...dades[preguntaIndex],
      nom_opcio: req.body.nom_opcio || dades[preguntaIndex].nom_opcio,
      tipus_opcio: req.body.tipus_opcio || dades[preguntaIndex].tipus_opcio,
      contigut: req.body.contigut || dades[preguntaIndex].contigut,
      descripcio_opcio: req.body.descripcio_opcio || dades[preguntaIndex].descripcio_opcio
    };
    escriureDades(dades);
    res.json(dades[preguntaIndex]);
  } else {
    res.status(404).send('Pregunta no trobada');
  }
});

// Eliminar una pregunta por ID
app.delete('/preguntas/:id', (req, res) => {
  const dades = llegirDades();
  const id = parseInt(req.params.id);
  const preguntaIndex = dades.findIndex(p => p.id === id);

  if (preguntaIndex !== -1) {
    dades.splice(preguntaIndex, 1);
    escriureDades(dades);
    res.send('Pregunta eliminada');
  } else {
    res.status(404).send('Pregunta no trobada');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});
