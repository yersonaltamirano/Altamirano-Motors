import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import VehicleGallery from "@/components/VehicleGallery";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function VehiclePage({
  params,
}: Props) {
  const { id } = await params;

  const { data: vehicle, error } =
    await supabaseAdmin
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !vehicle) {
    notFound();
  }

  const { data: gallery } =
    await supabaseAdmin
      .from("vehicle_images")
      .select("*")
      .eq("vehicle_id", id)
      .order("is_primary", {
        ascending: false,
      });

  const images =
    gallery && gallery.length > 0
      ? gallery.map((img) => img.image_url)
      : [vehicle.image];

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <Link
          href="/"
          className="mb-8 inline-flex rounded-xl bg-zinc-900 px-5 py-3 hover:bg-zinc-800"
        >
          ← Volver
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">

          <VehicleGallery
            title={`${vehicle.brand} ${vehicle.model}`}
            images={images}
          />

          <div>

            <p className="text-red-500 font-bold uppercase">
              {vehicle.brand}
            </p>

            <h1 className="mt-2 text-5xl font-black">
              {vehicle.model}
            </h1>

            <p className="mt-2 text-2xl text-gray-400">
              {vehicle.version}
            </p>

            <p className="mt-8 text-5xl font-black text-red-500">
              {vehicle.price}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5">
                              <Spec
                title="Año"
                value={vehicle.year}
              />

              <Spec
                title="Kilómetros"
                value={vehicle.km}
              />

              <Spec
                title="Combustible"
                value={vehicle.fuel}
              />

              <Spec
                title="Transmisión"
                value={vehicle.transmission}
              />

              <Spec
                title="Motor"
                value={vehicle.engine}
              />

              <Spec
                title="Tracción"
                value={vehicle.traction}
              />

              <Spec
                title="Color"
                value={vehicle.color}
              />

            </div>

            <div className="mt-12">

              <h2 className="mb-4 text-2xl font-bold">
                Descripción
              </h2>

              <p className="leading-8 text-gray-300">
                {vehicle.description}
              </p>

            </div>

            <div className="mt-12 space-y-4">

              <a
                href={`https://wa.me/56912345678?text=Hola,%20me%20interesa%20el%20${vehicle.brand}%20${vehicle.model}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-green-600 py-4 text-center text-xl font-bold transition hover:bg-green-700"
              >
                Consultar por WhatsApp
              </a>

              <button className="w-full rounded-xl bg-red-600 py-4 text-xl font-bold transition hover:bg-red-700">
                Solicitar financiamiento
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

function Spec({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <p className="text-sm text-gray-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold">
        {value}
      </p>

    </div>
  );
}