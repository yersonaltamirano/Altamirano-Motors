export default function Features() {
  return (
    <section className="bg-black py-24 px-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-16">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-zinc-900 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-5">🚗</div>
            <h3 className="text-2xl font-bold mb-3">
              Vehículos Revisados
            </h3>

            <p className="text-gray-400">
              Todos nuestros vehículos pasan por una revisión mecánica completa.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-5">💳</div>
            <h3 className="text-2xl font-bold mb-3">
              Financiamiento
            </h3>

            <p className="text-gray-400">
              Trabajamos con distintas entidades para ofrecer la mejor alternativa.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-5">🛡️</div>
            <h3 className="text-2xl font-bold mb-3">
              Garantía
            </h3>

            <p className="text-gray-400">
              Entregamos respaldo y seguridad en cada compra.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}