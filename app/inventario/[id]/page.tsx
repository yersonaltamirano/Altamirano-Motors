import Link from "next/link";
import { cars } from "@/data/cars";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CarDetail({ params }: Props) {
  const { id } = await params;

  const car = cars.find((c) => c.id.toString() === id);

  if (!car) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold">Vehículo no encontrado</h1>
      </main>
    );
  }

  const whatsapp = `https://wa.me/56912345678?text=${encodeURIComponent(
    `Hola, me interesa el ${car.brand} ${car.model} publicado en Altamirano Motors. ¿Sigue disponible?`
  )}`;

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <Link
          href="/"
          className="text-red-500 transition hover:text-red-400"
        >
          ← Volver al inventario
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">

          <div>

            <img
              src={car.image}
              alt={car.model}
              className="h-[600px] w-full rounded-2xl object-cover"
            />

          </div>

          <div>

            <p className="tracking-[8px] text-red-600">
              ALTAMIRANO MOTORS
            </p>

            <h1 className="mt-4 text-6xl font-black">
              {car.brand}
            </h1>

            <h2 className="mt-2 text-3xl text-gray-300">
              {car.model}
            </h2>

            <p className="mt-8 text-5xl font-black text-red-500">
              {car.price}
            </p>

            <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

              <div className="flex justify-between border-b border-zinc-800 py-4">
                <span>Año</span>
                <span>{car.year}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 py-4">
                <span>Kilómetros</span>
                <span>{car.km}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 py-4">
                <span>Combustible</span>
                <span>{car.fuel}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 py-4">
                <span>Transmisión</span>
                <span>{car.transmission}</span>
              </div>

            </div>

            <div className="mt-10 grid gap-4">

              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full rounded-xl bg-green-600 py-5 text-xl font-bold transition hover:bg-green-700">
                  Contactar por WhatsApp
                </button>
              </a>

              <button className="w-full rounded-xl border border-red-600 py-5 text-xl font-bold text-red-500 transition hover:bg-red-600 hover:text-white">
                Solicitar Financiamiento
              </button>

            </div>

            <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <h3 className="mb-6 text-2xl font-bold">
                Beneficios Altamirano Motors
              </h3>

              <ul className="space-y-4 text-gray-300">

                <li>✅ Vehículo inspeccionado.</li>

                <li>✅ Transferencia segura.</li>

                <li>✅ Asesoría personalizada.</li>

                <li>✅ Posibilidad de financiamiento.</li>

                <li>✅ Atención por WhatsApp.</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}