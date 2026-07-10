import Link from "next/link";

type Props = {
  id: number;
  image: string;
  brand: string;
  model: string;
  year: number;
  km: string;
  transmission: string;
  fuel: string;
  price: string;
};

export default function CarCard({
  id,
  image,
  brand,
  model,
  year,
  km,
  transmission,
  fuel,
  price,
}: Props) {
  return (
    <Link href={`/vehiculo/${id}`} className="block">
      <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20">

        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={`${brand} ${model}`}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
            Destacado
          </div>
        </div>

        <div className="p-6">

          <h2 className="text-3xl font-bold text-white">
            {brand}
          </h2>

          <p className="text-xl text-gray-300">
            {model}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-gray-400">

            <p>📅 {year}</p>

            <p>⚙ {transmission}</p>

            <p>⛽ {fuel}</p>

            <p>🛣 {km}</p>

          </div>

          <p className="mt-8 text-4xl font-black text-red-500">
            {price}
          </p>

          <div className="mt-8 w-full rounded-xl bg-red-600 py-4 text-center text-lg font-bold text-white transition hover:bg-red-700">
            Ver vehículo →
          </div>

        </div>

      </article>
    </Link>
  );
}