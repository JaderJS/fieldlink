import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex-1 flex flex-col justify-center items-center gap-6">
            <h3 className="antialiased text-4xl">Ops! parece que não há nada por aqui...</h3>
            <Link href='/' className="underline">Voltar</Link>
        </main>
    )
}