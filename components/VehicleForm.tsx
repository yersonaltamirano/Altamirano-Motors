"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Vehicle = {
  id?: number;
  brand: string;
  model: string;
  version: string;
  year: number | string;
  km: string;
  fuel: string;
  transmission: string;
  price: string;
  color: string;
  engine: string;
  traction: string;
  description: string;
  image: string;
  featured: boolean;
  sold?: boolean;
};

interface Props {
  vehicle?: Vehicle;
}

export default function VehicleForm({
  vehicle,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Vehicle>({
    brand: vehicle?.brand ?? "",
    model: vehicle?.model ?? "",
    version: vehicle?.version ?? "",
    year: vehicle?.year ?? "",
    km: vehicle?.km ?? "",
    fuel: vehicle?.fuel ?? "",
    transmission: vehicle?.transmission ?? "",
    price: vehicle?.price ?? "",
    color: vehicle?.color ?? "",
    engine: vehicle?.engine ?? "",
    traction: vehicle?.traction ?? "",
    description: vehicle?.description ?? "",
    image: vehicle?.image ?? "",
    featured: vehicle?.featured ?? false,
    sold: vehicle?.sold ?? false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const method = vehicle ? "PUT" : "POST";

    const url = vehicle
      ? `/api/vehicles/${vehicle.id}`
      : "/api/vehicles";
          try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();

        console.error(error);

        alert(error.error || "Error al guardar");

        setLoading(false);
        return;
      }

      const savedVehicle = await res.json();

      if (!vehicle) {
        router.push(
          `/admin/vehiculos/${savedVehicle.id}/editar`
        );
      } else {
        router.refresh();
      }

    } catch (err) {
      console.error(err);

      alert("Error inesperado");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 md:grid-cols-2"
    >

      <input
        name="brand"
        value={form.brand}
        onChange={handleChange}
        placeholder="Marca"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="model"
        value={form.model}
        onChange={handleChange}
        placeholder="Modelo"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="version"
        value={form.version}
        onChange={handleChange}
        placeholder="Versión"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        type="number"
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="Año"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="km"
        value={form.km}
        onChange={handleChange}
        placeholder="Kilómetros"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="fuel"
        value={form.fuel}
        onChange={handleChange}
        placeholder="Combustible"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="transmission"
        value={form.transmission}
        onChange={handleChange}
        placeholder="Transmisión"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Precio"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="color"
        value={form.color}
        onChange={handleChange}
        placeholder="Color"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="engine"
        value={form.engine}
        onChange={handleChange}
        placeholder="Motor"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <input
        name="traction"
        value={form.traction}
        onChange={handleChange}
        placeholder="Tracción"
        className="rounded-lg bg-zinc-900 p-4"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={6}
        placeholder="Descripción"
        className="rounded-lg bg-zinc-900 p-4 md:col-span-2"
      />
            <label className="flex items-center gap-3 md:col-span-2">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        Destacar vehículo
      </label>

      {vehicle && (
        <Link
          href={`/admin/vehiculos/${vehicle.id}/imagenes`}
          className="rounded-xl border border-zinc-700 bg-zinc-800 py-4 text-center text-lg font-bold transition hover:bg-zinc-700 md:col-span-2"
        >
          🖼 Administrar imágenes
        </Link>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-red-600 py-4 text-lg font-bold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2"
      >
        {loading
          ? "Guardando..."
          : vehicle
          ? "Guardar cambios"
          : "Guardar vehículo"}
      </button>

    </form>
  );
}