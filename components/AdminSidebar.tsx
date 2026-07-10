import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="min-h-screen w-72 bg-zinc-950 border-r border-zinc-800 p-8">

      <h1 className="text-3xl font-black">
        ALTAMIRANO <span className="text-red-600">MOTORS</span>
      </h1>

      <p className="mt-2 text-gray-500">
        Panel Administrativo
      </p>

      <nav className="mt-12 flex flex-col gap-3">

        <Link
          href="/admin"
          className="rounded-xl bg-red-600 px-5 py-4 font-semibold transition hover:bg-red-700"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/admin/vehiculos"
          className="rounded-xl bg-zinc-900 px-5 py-4 transition hover:bg-zinc-800"
        >
          🚗 Vehículos
        </Link>

        <Link
          href="/admin/clientes"
          className="rounded-xl bg-zinc-900 px-5 py-4 transition hover:bg-zinc-800"
        >
          👥 Clientes
        </Link>

        <Link
          href="/admin/financiamiento"
          className="rounded-xl bg-zinc-900 px-5 py-4 transition hover:bg-zinc-800"
        >
          💳 Financiamiento
        </Link>

        <Link
          href="/admin/configuracion"
          className="rounded-xl bg-zinc-900 px-5 py-4 transition hover:bg-zinc-800"
        >
          ⚙️ Configuración
        </Link>

      </nav>

    </aside>
  );
}