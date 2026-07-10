"use client";

type CategoriesProps = {
  selected: string;
  setSelected: (category: string) => void;
};

export default function Categories({
  selected,
  setSelected,
}: CategoriesProps) {
  const categories = [
    "Todos",
    "SUV",
    "Sedán",
    "Camioneta",
    "Hatchback",
  ];

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
            selected === category
              ? "bg-red-600 text-white shadow-lg"
              : "border border-zinc-700 bg-zinc-900 text-white hover:border-red-600 hover:bg-red-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}