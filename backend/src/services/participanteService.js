import { participanteRepository } from '../repositories/participanteRepository.js';
import { eventoRepository } from '../repositories/eventoRepository.js';
import crypto from 'crypto';

export const participanteService = {
    async create(participanteData) {
        const participantes = await participanteRepository.getAll();
        const nuevo = { id: crypto.randomUUID(), ...participanteData };
        participantes.push(nuevo);
        await participanteRepository.saveAll(participantes);
        return nuevo;
    },

    async getAll() {
        return await participanteRepository.getAll();
    },

    async inscribir(eventoId, participanteId) {
        const eventos = await eventoRepository.getAll();
        const participantes = await participanteRepository.getAll();

        const evento = eventos.find(e => e.id === eventoId);
        const participante = participantes.find(p => p.id === participanteId);

        if (!evento || !participante) throw new Error('Evento o Participante no encontrado');
        if (evento.inscritos.includes(participanteId)) throw new Error('Ya está inscrito en este evento');

        evento.inscritos.push(participanteId);
        await eventoRepository.saveAll(eventos);
        return evento;
    },

    async getInscritos(eventoId) {
        const eventos = await eventoRepository.getAll();
        const participantes = await participanteRepository.getAll();

        const evento = eventos.find(e => e.id === eventoId);
        if (!evento) throw new Error('Evento no encontrado');

        return participantes.filter(p => evento.inscritos.includes(p.id));
    }
};