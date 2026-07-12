import React, { useEffect, useState } from 'react';
import api from './api';
import './index.css';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import ParticipantSection from './components/ParticipantSection';

function App() {
  const [view, setView] = useState('eventos');
  const [eventos, setEventos] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedEventInscritos, setSelectedEventInscritos] = useState([]);

  const fetchEventos = async () => {
    const res = await api.get('/eventos', { params: { search } });
    setEventos(res.data);
  };

  const fetchParticipantes = async () => {
    const res = await api.get('/participantes');
    setParticipantes(res.data);
  };

  useEffect(() => { fetchEventos(); fetchParticipantes(); }, []);

  useEffect(() => { const t = setTimeout(() => fetchEventos(), 300); return () => clearTimeout(t); }, [search]);

  const remove = async (id) => { await api.delete(`/eventos/${id}`); await fetchEventos(); };
  const verInscritos = async (eventoId) => { const res = await api.get(`/eventos/${eventoId}/inscritos`); setSelectedEventInscritos(res.data); }

  const createParticipante = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    await api.post('/participantes', { nombre: form.get('nombre'), email: form.get('email') });
    e.target.reset();
    await fetchParticipantes();
  };

  const inscribir = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    await api.post('/inscripciones', { eventoId: form.get('eventoId'), participanteId: form.get('participanteId') });
    await fetchEventos();
    if (form.get('eventoId')) await verInscritos(form.get('eventoId'));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Gestión de Eventos</h1>
        <nav className="mt-3 flex gap-3">
          <button onClick={() => setView('eventos')} className={`px-3 py-1 rounded ${view==='eventos'?'bg-blue-600 text-white':''}`}>Eventos</button>
          <button onClick={() => setView('participantes')} className={`px-3 py-1 rounded ${view==='participantes'?'bg-blue-600 text-white':''}`}>Participantes</button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          {view === 'eventos' && (
            <div>
              <div className="mb-4 flex gap-2">
                <input placeholder="Buscar por título o tipo" value={search} onChange={e => setSearch(e.target.value)} className="flex-1 p-2 border rounded" />
                <button data-testid="nuevo-evento" onClick={() => { setEditing({}); }} className="px-3 py-2 bg-green-600 text-white rounded">Nuevo</button>
              </div>

              <EventList eventos={eventos} onEdit={ev => setEditing(ev)} onDelete={remove} onVerInscritos={verInscritos} />
            </div>
          )}

          {view === 'participantes' && (
            <ParticipantSection participantes={participantes} eventos={eventos} onCreateParticipante={createParticipante} onInscribir={inscribir} />
          )}
        </section>

        <aside>
          <div className="p-3 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">Formulario</h3>
            <EventForm key={editing?.id || 'new'} initial={editing || {}} onSaved={() => { setEditing(null); fetchEventos(); }} />
          </div>

          <div className="p-3 bg-white rounded shadow mt-4">
            <h3 className="font-semibold">Inscritos</h3>
            <div className="mt-2">
              {selectedEventInscritos.length === 0 ? (
                <div className="text-sm text-gray-600">Seleccione "Ver inscritos" en un evento para listar aquí.</div>
              ) : (
                selectedEventInscritos.map(s => (
                  <div key={s.id} className="p-2 border-b">{s.nombre} — {s.email}</div>
                ))
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
