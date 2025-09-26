'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import aeronave from '../../image/aeronave.jpg'
import Image from 'next/image'

type Aeronave = {
  id: number
  modelo: string
  fabricante: string
  ano: number
  capacidade: number
}

const initialAeronaves: Aeronave[] = [
  { id: 1, modelo: '737-800', fabricante: 'Boeing', ano: 1998, capacidade: 160 },
  { id: 2, modelo: 'A320', fabricante: 'Airbus', ano: 2005, capacidade: 150 },
  { id: 3, modelo: 'E195', fabricante: 'Embraer', ano: 2012, capacidade: 120 }
]

export default function AeronavesPage() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(initialAeronaves)

  useEffect(() => {
    fetch('/api/aeronaves')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAeronaves(data)
        }
      })
      .catch(() => {})
  }, [])

  const deletar = async (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      await fetch('/api/aeronaves/' + id, { method: 'DELETE' })
      setAeronaves(aeronaves.filter(a => a.id !== id))
    }
  }

  return (
    <div className="page-container">
      <Image
        src={aeronave}
        alt="Aeronave"
        width={300}
        height={200}
        className="imagem1"
      />
      <h1 className="titulo1">Lista de Aeronaves</h1>

      <div style={{ textAlign: 'center' }}>
        <Link href="/aeronaves/nova" className="botão1">+ Adicionar Aeronave</Link>
      </div>

      <table className="aeronaves-table">
        <thead>
          <tr className="thead-row">
            <th>ID</th>
            <th>Modelo</th>
            <th>Fabricante</th>
            <th>Ano</th>
            <th>Capacidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aeronaves.map(a => (
            <tr key={a.id} className="lista">
              <td>{a.id}</td>
              <td>{a.modelo}</td>
              <td>{a.fabricante}</td>
              <td>{a.ano}</td>
              <td>{a.capacidade}</td>
              <td className="acoes">
                <Link href={`/aeronaves/${a.id}/editar`} className="editar-link">Editar</Link>
                <button onClick={() => deletar(a.id)} className="excluir-btn">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}