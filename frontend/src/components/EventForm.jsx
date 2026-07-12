import React, { useEffect, useState } from 'react';
import api from '../api';

export default function EventForm({ onSaved, initial = {} }) {
  const [titulo, setTitulo] = useState(initial.titulo || '');
  const [tipo, setTipo] = useState(initial.tipo || '');
  const [fecha, setFecha] = useState(initial.fecha || '');

  useEffect(() => {
    setTitulo(initial.titulo || '');
    setTipo(initial.tipo || '');
    setFecha(initial.fecha || '');
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { titulo, tipo, fecha };
    if (initial.id) {
      await api.put(`/eventos/${initial.id}`, payload);
    } else {
      await api.post('/eventos', payload);
    }
    onSaved && onSaved();
    setTitulo('');
    setTipo('');
    setFecha('');
  };

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow" data-testid="event-form">
      <div className="mb-2">
        <label className="block text-sm font-medium">Título</label>
        <input data-testid="titulo-input" className="border p-2 w-full" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Tipo</label>
        <input data-testid="tipo-input" className="border p-2 w-full" value={tipo} onChange={e => setTipo(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Fecha</label>
        <input data-testid="fecha-input" type="date" className="border p-2 w-full" value={fecha} onChange={e => setFecha(e.target.value)} required />
      </div>
      <div className="flex gap-2">
        <button data-testid="guardar-evento" type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
      </div>
    </form>
  );
}
