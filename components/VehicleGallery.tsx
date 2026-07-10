"use client";

import { useEffect, useState } from "react";

interface Props {
  images: string[];
  title: string;
}

export default function VehicleGallery({
  images,
  title,
}: Props) {
  const [selected, setSelected] = useState(images[0] ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(images[0] ?? "");
  }, [images]);

  function nextImage() {
    const index = images.indexOf(selected);

    if (index === images.length - 1) {
      setSelected(images[0]);
    } else {
      setSelected(images[index + 1]);
    }
  }

  function prevImage() {
    const index = images.indexOf(selected);

    if (index === 0) {
      setSelected(images[images.length - 1]);
    } else {
      setSelected(images[index - 1]);
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;

      if (e.key === "ArrowRight") nextImage();

      if (e.key === "ArrowLeft") prevImage();

      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [open, selected]);

  return (
    <>
      <div className="space-y-5">

        <div
          onClick={() => setOpen(true)}
          className="cursor-zoom-in overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
        >

          <img
            src={selected}
            alt={title}
            className="h-[600px] w-full object-cover transition duration-300 hover:scale-105"
          />

        </div>
                {images.length > 1 && (

          <div className="grid grid-cols-5 gap-3">

            {images.map((image, index) => (

              <button
                key={image}
                type="button"
                onClick={() => setSelected(image)}
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  selected === image
                    ? "border-red-600 scale-105"
                    : "border-zinc-700 hover:border-red-500"
                }`}
              >

                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="h-24 w-full object-cover"
                />

              </button>

            ))}

          </div>

        )}

      </div>

      {open && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">

          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-zinc-900 px-4 py-2 text-3xl font-bold hover:bg-red-600"
          >
            ✕
          </button>

          {images.length > 1 && (

            <button
              onClick={prevImage}
              className="absolute left-6 rounded-full bg-zinc-900 p-4 text-3xl hover:bg-red-600"
            >
              ‹
            </button>

          )}

          <img
            src={selected}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          />

          {images.length > 1 && (

            <button
              onClick={nextImage}
              className="absolute right-6 rounded-full bg-zinc-900 p-4 text-3xl hover:bg-red-600"
            >
              ›
            </button>

          )}

        </div>

      )}

    </>
  );
}