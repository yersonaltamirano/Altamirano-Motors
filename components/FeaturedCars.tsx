import SearchBar from "./SearchBar";
import CarCard from "./CarCard";
import { getVehicles } from "../lib/vehicles";

export default async function FeaturedCars() {
  const vehicles = await getVehicles();

  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm font-semibold tracking-[8px] text-red-600">
            INVENTARIO
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-white">
            Vehículos Destacados
          </h2>

          <p className="mt-6 text-xl text-gray-400">
            Vehículos seleccionados disponibles en Altamirano Motors.
          </p>
        </div>

        <SearchBar />

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {vehicles.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              image={car.image}
              brand={car.brand}
              model={car.model}
              year={car.year}
              km={car.km}
              transmission={car.transmission}
              fuel={car.fuel}
              price={car.price}
            />
          ))}

        </div>

      </div>
    </section>
  );
}