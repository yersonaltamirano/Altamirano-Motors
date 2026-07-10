import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import ImageUploader from "@/components/ImageUploader";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ImagenesVehiculo({
  params,
}: Props) {
  const { id } = await params;

  const { data: vehicle } = await supabaseAdmin
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (!vehicle) {
    notFound();
  }

  const { data: images } = await supabaseAdmin
    .from("vehicle_images")
    .select("*")
    .eq("vehicle_id", id)
    .order("is_primary", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-8 py-10">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">
              Imágenes
            </h1>

            <p className="mt-2 text-gray-400">
              {vehicle.brand} {vehicle.model}
            </p>

          </div>

          <Link
            href={`/admin/vehiculos/${id}/editar`}
            className="rounded-xl bg-zinc-800 px-6 py-4 font-bold hover:bg-zinc-700"
          >
            ← Volver
          </Link>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <h2 className="mb-6 text-2xl font-bold">
            Agregar nuevas imágenes
          </h2>

          <ImageUploader
            initialImages={[]}
            onUpload={() => {}}
          />

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                      {images?.map((image: any) => (

            <div
              key={image.id}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >

              <img
                src={image.image_url}
                alt="Vehículo"
                className="h-56 w-full object-cover"
              />

              <div className="space-y-3 p-5">

                {image.is_primary ? (

                  <div className="rounded-lg bg-green-600 py-2 text-center font-bold">
                    ⭐ Imagen principal
                  </div>

                ) : (

                  <button
                    className="w-full rounded-lg bg-amber-600 py-3 font-bold transition hover:bg-amber-700"
                  >
                    ⭐ Convertir en portada
                  </button>

                )}

                <button
                  className="w-full rounded-lg bg-red-600 py-3 font-bold transition hover:bg-red-700"
                >
                  🗑 Eliminar imagen
                </button>

              </div>

            </div>

          ))}

          {(!images || images.length === 0) && (

            <div className="col-span-full rounded-2xl border border-dashed border-zinc-700 p-16 text-center">

              <h2 className="text-3xl font-bold">
                No hay imágenes
              </h2>

              <p className="mt-3 text-gray-400">
                Sube fotografías para comenzar la galería.
              </p>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}