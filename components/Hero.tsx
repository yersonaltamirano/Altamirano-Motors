export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000')",
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">

        <div className="max-w-3xl">

          <p className="mb-4 text-lg font-semibold tracking-[8px] text-red-600">
            ALTAMIRANO MOTORS
          </p>

          <h1 className="text-6xl font-extrabold leading-tight text-white md:text-8xl">
            Compra con confianza.
          </h1>

          <p className="mt-8 text-xl leading-8 text-gray-300">
            Vehículos cuidadosamente seleccionados,
            inspeccionados y publicados con total transparencia.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <button className="rounded-xl bg-red-600 px-10 py-4 text-lg font-bold transition hover:scale-105 hover:bg-red-700">
              Ver Inventario
            </button>

            <button className="rounded-xl border border-white px-10 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-black">
              Contactar
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}