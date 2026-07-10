import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import VehicleForm from "@/components/VehicleForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarVehiculo({ params }: Props) {
  const { id } = await params;

  const { data: vehicle, error } = await supabaseAdmin
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !vehicle) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black">
              Editar Vehículo
            </h1>

            <p className="mt-2 text-gray-400">
              Modifica la información del vehículo.
            </p>
          </div>

          <Link
            href="/admin/vehiculos"
            className="rounded-lg bg-zinc-800 px-5 py-3 hover:bg-zinc-700"
          >
            Volver
          </Link>
        </div>

        <VehicleForm vehicle={vehicle} />
      </div>
    </main>
  );
}