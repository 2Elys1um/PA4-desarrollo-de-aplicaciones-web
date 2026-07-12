// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'
import api from './api'

vi.mock('./api')

describe('App basic rendering', () => {
  it('renders header and switches views', async () => {
    api.get.mockResolvedValueOnce({ data: [] }); // eventos
    api.get.mockResolvedValueOnce({ data: [] }); // participantes

    render(<App />)
    expect(screen.getByText(/Gestión de Eventos/i)).toBeTruthy()

    const participantesBtn = screen.getByRole('button', { name: /Participantes/i })
    fireEvent.click(participantesBtn)
    expect(screen.getByText(/Inscribir participante/i)).toBeTruthy()
  })
})
