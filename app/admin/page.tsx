import AdminSidebar from "@/components/AdminSidebar";

export default function Admin() {
  return (
    <main className="flex min-h-screen bg-black text-white">

      <AdminSidebar />

      <section className="flex-1 p-12">

        <h1 className="text-5xl font-black">
          Dashboard
        </h1>

        <p className="mt-3 text-gray-400">
          Bienvenido al panel de administración.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-zinc-900 p-8">
            <h2 className="text-gray-400">
              Vehículos
            </h2>

            <p className="mt-4 text-5xl font-black">
              0
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-8">
            <h2 className="text-gray-400">
              Clientes
            </h2>

            <p className="mt-4 text-5xl font-black">
              0
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-8">
            <h2 className="text-gray-400">
              Ventas
            </h2>

            <p className="mt-4 text-5xl font-black">
              0
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-8">
            <h2 className="text-gray-400">
              Financiamiento
            </h2>

            <p className="mt-4 text-5xl font-black">
              0
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}