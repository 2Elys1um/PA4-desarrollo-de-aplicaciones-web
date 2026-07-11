import { eventoService } from '../services/eventoService.js';

export const getEventos = async (req, res) => {
    try {
        const { search } = req.query;
        const eventos = await eventoService.list(search);
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEvento = async (req, res) => {
    try {
        const nuevo = await eventoService.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvento = async (req, res) => {
    try {
        const actualizado = await eventoService.update(req.params.id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteEvento = async (req, res) => {
    try {
        await eventoService.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};