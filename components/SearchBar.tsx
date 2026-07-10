export default function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Buscar por marca, modelo o año..."
      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-5 text-lg text-white placeholder:text-gray-500"
    />
  );
}