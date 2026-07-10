"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Props {
  vehicleId: string;
}

export default function VehicleImageUploader({
  vehicleId,
}: Props) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  async function upload(files: FileList | null) {
    if (!files) return;

    setLoading(true);

    for (const file of Array.from(files)) {

      const filename =
        `${Date.now()}-${Math.random()}-${file.name}`;

      const { error } = await supabase.storage
        .from("vehicles")
        .upload(filename, file);

      if (error) {
        alert(error.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("vehicles")
        .getPublicUrl(filename);
              const primaryResponse = await fetch(
        `/api/vehicles/${vehicleId}`
      );

      const vehicle = await primaryResponse.json();

      const isPrimary =
        !vehicle.image || vehicle.image === "";

      const res = await fetch("/api/vehicle-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle_id: vehicleId,
          image_url: publicUrl,
          is_primary: isPrimary,
        }),
      });

      if (!res.ok) {
        alert("No fue posible guardar la imagen.");
        continue;
      }

      if (isPrimary) {
        await fetch(`/api/vehicles/${vehicleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...vehicle,
            image: publicUrl,
          }),
        });
      }

    }

    setLoading(false);

    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Agregar imágenes
      </h2>

      <div
        onClick={() => inputRef.current?.click()}
        className="flex h-56 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 transition hover:border-red-600"
      >
                {loading ? (

          <div className="text-center">

            <p className="text-xl font-bold">
              Subiendo imágenes...
            </p>

            <p className="mt-2 text-gray-400">
              Espera unos segundos.
            </p>

          </div>

        ) : (

          <div className="text-center">

            <p className="text-2xl font-bold">
              📷 Agregar imágenes
            </p>

            <p className="mt-3 text-gray-400">
              Haz clic aquí para seleccionar una o varias fotografías.
            </p>

          </div>

        )}

      </div>

      <input
        ref={inputRef}
        hidden
        multiple
        accept="image/*"
        type="file"
        onChange={(e) => upload(e.target.files)}
      />

      <div className="mt-6 rounded-xl bg-zinc-950 p-5 text-sm text-gray-400">

        <p>
          • Puedes seleccionar varias imágenes al mismo tiempo.
        </p>

        <p className="mt-2">
          • La primera imagen será la portada automáticamente si el vehículo aún no tiene una.
        </p>

        <p className="mt-2">
          • Luego podrás cambiar la portada o eliminar imágenes desde esta misma pantalla.
        </p>

          </div>
  );
}