import express from 'express';
import cors from 'cors';
import { getEventos, createEvento, updateEvento, deleteEvento } from './controllers/eventoController.js';
import { createParticipante, getParticipantes, inscribirParticipante, getInscritosPorEvento } from './controllers/participanteController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/eventos', getEventos);
app.post('/api/eventos', createEvento);
app.put('/api/eventos/:id', updateEvento);
app.delete('/api/eventos/:id', deleteEvento);

app.post('/api/participantes', createParticipante);
app.get('/api/participantes', getParticipantes);
app.post('/api/inscripciones', inscribirParticipante);
app.get('/api/eventos/:eventoId/inscritos', getInscritosPorEvento);

export default app;