import { eventoRepository } from '../repositories/eventoRepository.js';
import crypto from 'crypto';

const normalizeId = (value) => {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    return trimmed || crypto.randomUUID();
};

const normalizeEventos = (eventos) => eventos.map((evento, index) => ({
    ...evento,
    id: normalizeId(evento?.id || ''),
    inscritos: Array.isArray(evento?.inscritos) ? evento.inscritos : [],
    _index: index
}));

export const eventoService = {
    async list(search = '') {
        let eventos = await eventoRepository.getAll();
        eventos = normalizeEventos(eventos);

        const eventosSinCambios = eventos.every((evento) => evento.id && String(evento.id).trim());
        if (!eventosSinCambios) {
            await eventoRepository.saveAll(eventos.map(({ _index, ...evento }) => evento));
        }

        if (!search) return eventos.map(({ _index, ...evento }) => evento);
        return eventos
            .filter(e => 
                e.titulo.toLowerCase().includes(search.toLowerCase()) || 
                e.tipo.toLowerCase().includes(search.toLowerCase())
            )
            .map(({ _index, ...evento }) => evento);
    },

    async create(eventoData) {
        const eventos = await eventoRepository.getAll();
        const nuevoEvento = {
            ...eventoData,
            id: normalizeId(eventoData?.id),
            inscritos: []
        };
        eventos.push(nuevoEvento);
        await eventoRepository.saveAll(eventos);
        return nuevoEvento;
    },

    async update(id, updateData) {
        const eventos = await eventoRepository.getAll();
        const index = eventos.findIndex(e => e.id === id);
        if (index === -1) throw new Error('Evento no encontrado');
        
        eventos[index] = {
            ...eventos[index],
            ...updateData,
            id: normalizeId(updateData?.id || eventos[index].id)
        };
        await eventoRepository.saveAll(eventos);
        return eventos[index];
    },

    async delete(id) {
        let eventos = await eventoRepository.getAll();
        eventos = eventos.filter(e => e.id !== id);
        await eventoRepository.saveAll(eventos);
    }
};