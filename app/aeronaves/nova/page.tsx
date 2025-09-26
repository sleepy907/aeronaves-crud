'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovaAeronave() {
  const [modelo, setModelo] = useState('')
  const [fabricante, setFabricante] = useState('')
  const [ano, setAno] = useState('')
  const [capacidade, setCapacidade] = useState('')
  const router = useRouter()

  const salvar = async (e?: React.FormEvent) => {
    e?.preventDefault()
    await fetch('/api/aeronaves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelo, fabricante, ano: Number(ano), capacidade: Number(capacidade) })
    })
    router.push('/aeronaves')
  }

  return (
    <div className="page-container">
      <h1 className="titulo1">Nova Aeronave</h1>

      <form className="form-container" onSubmit={salvar}>
        <div className="form-row">
          <input
            placeholder="Modelo"
            className="form-input"
            value={modelo}
            onChange={e => setModelo(e.target.value)}
            required
          />
          <input
            placeholder="Fabricante"
            className="form-input"
            value={fabricante}
            onChange={e => setFabricante(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <input
            placeholder="Ano"
            className="form-input"
            value={ano}
            onChange={e => setAno(e.target.value)}
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            required
          />
          <input
            placeholder="Capacidade"
            className="form-input"
            value={capacidade}
            onChange={e => setCapacidade(e.target.value)}
            type="number"
            min="1"
            required
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button type="submit" className="save-btn">Salvar</button>
        </div>
      </form>
    </div>
  )
}