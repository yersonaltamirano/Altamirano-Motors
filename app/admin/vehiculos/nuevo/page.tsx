import VehicleForm from "@/components/VehicleForm";

export default function NuevoVehiculo() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-5xl font-black">
            Nuevo Vehículo
          </h1>

          <p className="mt-2 text-gray-400">
            Agrega un vehículo al inventario.
          </p>
        </div>

        <VehicleForm />
      </div>
    </main>
  );
}