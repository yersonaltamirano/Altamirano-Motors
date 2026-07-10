export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <h1 className="text-2xl font-black tracking-widest text-white">
          ALTAMIRANO <span className="text-red-600">MOTORS</span>
        </h1>

        <nav className="hidden gap-8 md:flex">

          <a href="#" className="hover:text-red-500">
            Inicio
          </a>

          <a href="#" className="hover:text-red-500">
            Inventario
          </a>

          <a href="#" className="hover:text-red-500">
            Financiamiento
          </a>

          <a href="#" className="hover:text-red-500">
            Nosotros
          </a>

          <a href="#" className="hover:text-red-500">
            Contacto
          </a>

        </nav>

      </div>
    </header>
  );
}