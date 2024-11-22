import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">404 - Pagina no encontrada</h1>
      <p className="mb-8 text-lg">Lo siento, lo que buscas no existe.</p>
      <Link className="text-blue-500 hover:underline" href="/">
        Volver al inicio
      </Link>
    </div>
  );
}
