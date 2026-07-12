import React from 'react';

export default function ParticipantSection({ participantes = [], eventos = [], onCreateParticipante, onInscribir }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Participantes</h2>
      <form onSubmit={onCreateParticipante} className="p-3 bg-white rounded shadow mb-4" data-testid="create-participante-form">
        <div className="mb-2">
          <input name="nombre" data-testid="nombre-input" placeholder="Nombre" className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-2">
          <input name="email" data-testid="email-input" placeholder="Email" type="email" className="w-full p-2 border rounded" required />
        </div>
        <button data-testid="crear-participante" className="px-3 py-2 bg-green-600 text-white rounded">Crear</button>
      </form>

      <div className="space-y-2" data-testid="participant-list">
        {participantes.map(p => (
          <div key={p.id} className="p-2 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-medium">{p.nombre}</div>
              <div className="text-sm text-gray-600">{p.email}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-6 font-semibold">Inscribir participante</h3>
      <form onSubmit={onInscribir} className="p-3 bg-white rounded shadow mt-2" data-testid="inscribir-form">
        <div className="mb-2">
          <label className="block text-sm">Evento</label>
          <select name="eventoId" data-testid="evento-select" className="w-full border p-2 rounded">
            <option value="">-- seleccionar --</option>
            {eventos.map(e => <option key={e.id} value={e.id}>{e.titulo}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm">Participante</label>
          <select name="participanteId" data-testid="participante-select" className="w-full border p-2 rounded">
            <option value="">-- seleccionar --</option>
            {participantes.map(p => <option key={p.id} value={p.id}>{p.nombre} ({p.email})</option>)}
          </select>
        </div>
        <button data-testid="inscribir-btn" className="px-3 py-2 bg-blue-600 text-white rounded">Inscribir</button>
      </form>
    </div>
  );
}
