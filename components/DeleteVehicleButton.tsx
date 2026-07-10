"use client";

import { useRouter } from "next/navigation";
import { deleteVehicle } from "@/app/actions/vehicles";

interface Props {
  id: number;
}

export default function DeleteVehicleButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("¿Eliminar este vehículo?")) return;

    try {
      await deleteVehicle(id);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el vehículo.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-700"
    >
      Eliminar
    </button>
  );
}