'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Aeronave = {
  id: number
  modelo: string
  fabricante: string
  ano: number
  capacidade: number
}

export default function EditarAeronave() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [form, setForm] = useState<Aeronave | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/aeronaves/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setForm(data))
      .catch(() => setForm({ id: Number(id), modelo: '', fabricante: '', ano: 0, capacidade: 0 }))
      .finally(() => setLoading(false))
  }, [id])

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form) return
    await fetch(`/api/aeronaves/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/aeronaves')
  }

  if (loading) return <p className='loading'>Carregando...</p>

  return (
    <div className="page-container">
      <h1 className="titulo1">Editar Aeronave #{id}</h1>

      <form className="form-container" onSubmit={salvar}>
        <label>
          Modelo
          <input className="form-input" value={form?.modelo || ''} onChange={e => setForm({ ...(form as Aeronave), modelo: e.target.value })} />
        </label>

        <label>
          Fabricante
          <input className="form-input" value={form?.fabricante || ''} onChange={e => setForm({ ...(form as Aeronave), fabricante: e.target.value })} />
        </label>

        <label>
          Ano
          <input className="form-input" type="number" value={form?.ano || 0} onChange={e => setForm({ ...(form as Aeronave), ano: Number(e.target.value) })} />
        </label>

        <label>
          Capacidade
          <input className="form-input" type="number" value={form?.capacidade || 0} onChange={e => setForm({ ...(form as Aeronave), capacidade: Number(e.target.value) })} />
        </label>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button type="submit" className="save-btn">Salvar</button>
          <button type="button" className="excluir-btn" style={{ marginLeft: 8 }} onClick={() => router.push('/aeronaves')}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}