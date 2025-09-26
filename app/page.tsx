import Link from "next/link"
import Image from "next/image"
import './global.css'
import aeronave from '../image/aeronave.jpg'

export default function Home(){
    return (
        <main className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-50">
            <Image 
                src={aeronave} 
                alt="Aeronave" 
                width={300} 
                height={200}
                className="imagem1"
            />
            
            <h1 className="titulo1">CRUD de Aeronaves</h1>
            
            <Link
                href="/aeronaves"
            >
                <p className="botão1">Ver Aeronaves</p>
            </Link>
        </main>
    )
}