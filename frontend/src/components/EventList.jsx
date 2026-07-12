import React from 'react';

export default function EventList({ eventos = [], onEdit, onDelete, onVerInscritos }) {
  return (
    <div className="space-y-3" data-testid="event-list">
      {eventos.map(ev => (
        <div key={ev.id} className="p-3 bg-white rounded shadow flex justify-between items-center" data-event-id={ev.id}>
          <div>
            <div className="font-semibold">{ev.titulo}</div>
            <div className="text-sm text-gray-600">{ev.tipo} — {ev.fecha}</div>
          </div>
          <div className="flex gap-2">
            <button data-testid={`edit-${ev.id}`} onClick={() => onEdit(ev)} className="px-2 py-1 bg-yellow-500 text-white rounded">Editar</button>
            <button data-testid={`delete-${ev.id}`} onClick={() => onDelete(ev.id)} className="px-2 py-1 bg-red-600 text-white rounded">Eliminar</button>
            <button data-testid={`inscritos-${ev.id}`} onClick={() => onVerInscritos(ev.id)} className="px-2 py-1 bg-blue-600 text-white rounded">Ver inscritos</button>
          </div>
        </div>
      ))}
    </div>
  );
}
