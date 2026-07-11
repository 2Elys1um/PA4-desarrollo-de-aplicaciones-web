import { participanteService } from '../services/participanteService.js';

export const createParticipante = async (req, res) => {
    try {
        const nuevo = await participanteService.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getParticipantes = async (req, res) => {
    try {
        const lista = await participanteService.getAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const inscribirParticipante = async (req, res) => {
    try {
        const { eventoId, participanteId } = req.body;
        const actualizado = await participanteService.inscribir(eventoId, participanteId);
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getInscritosPorEvento = async (req, res) => {
    try {
        const inscritos = await participanteService.getInscritos(req.params.eventoId);
        res.json(inscritos);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};