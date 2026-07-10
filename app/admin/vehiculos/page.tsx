import Link from "next/link";
import { getVehicles } from "@/lib/vehicles";
import DeleteVehicleButton from "@/components/DeleteVehicleButton";
import LogoutButton from "@/components/LogoutButton";

export default async function VehiculosAdmin() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-8 py-10">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">
              Vehículos
            </h1>

            <p className="mt-2 text-gray-400">
              Administración del inventario.
            </p>

          </div>

          <div className="flex gap-3">

            <Link
              href="/admin/vehiculos/nuevo"
              className="rounded-xl bg-red-600 px-6 py-4 font-bold transition hover:bg-red-700"
            >
              + Nuevo Vehículo
            </Link>

            <LogoutButton />

          </div>

        </div>

        <div className="grid gap-6">

          {vehicles.map((car: any) => (

            <div
              key={car.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600"
            >

              <div className="flex items-center gap-6">

                {car.image ? (

                  <img
                    src={car.image}
                    alt={car.model}
                    className="h-28 w-40 rounded-xl object-cover"
                  />

                ) : (

                  <div className="flex h-28 w-40 items-center justify-center rounded-xl bg-zinc-800 text-sm text-gray-500">
                    Sin imagen
                  </div>

                )}

                <div>

                  <h2 className="text-2xl font-bold">
                    {car.brand} {car.model}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    {car.version}
                  </p>

                  <div className="mt-4 flex gap-6 text-sm text-gray-400">

                    <span>📅 {car.year}</span>

                    <span>🛣 {car.km}</span>

                    <span>⚙ {car.transmission}</span>

                    <span>⛽ {car.fuel}</span>

                  </div>

                  <p className="mt-5 text-3xl font-black text-red-500">
                    {car.price}
                  </p>

                </div>

              </div>

              <div className="flex flex-col gap-3">
                                <Link
                  href={`/vehiculo/${car.id}`}
                  target="_blank"
                  className="rounded-lg bg-zinc-700 px-5 py-3 text-center font-bold transition hover:bg-zinc-600"
                >
                  👁 Ver
                </Link>

                <Link
                  href={`/admin/vehiculos/${car.id}/editar`}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-center font-bold transition hover:bg-blue-700"
                >
                  ✏ Editar
                </Link>

                <Link
                  href={`/admin/vehiculos/${car.id}/imagenes`}
                  className="rounded-lg bg-amber-600 px-5 py-3 text-center font-bold transition hover:bg-amber-700"
                >
                  🖼 Imágenes
                </Link>

                <DeleteVehicleButton id={car.id} />

              </div>

            </div>

          ))}

          {vehicles.length === 0 && (

            <div className="rounded-2xl border border-dashed border-zinc-700 p-16 text-center">

              <h2 className="text-3xl font-bold">
                No hay vehículos
              </h2>

              <p className="mt-3 text-gray-400">
                Comienza agregando tu primer vehículo al inventario.
              </p>

              <Link
                href="/admin/vehiculos/nuevo"
                className="mt-8 inline-flex rounded-xl bg-red-600 px-6 py-4 font-bold transition hover:bg-red-700"
              >
                + Nuevo Vehículo
              </Link>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}