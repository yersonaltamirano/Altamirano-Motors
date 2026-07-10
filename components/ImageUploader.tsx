"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  initialImages?: string[];
  onUpload: (urls: string[]) => void;
}

export default function ImageUploader({
  initialImages = [],
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(initialImages);

  async function upload(files: FileList | null) {
    if (!files) return;

    setLoading(true);

    const uploaded = [...images];

    for (const file of Array.from(files)) {
      const filename = `${Date.now()}-${Math.random()}-${file.name}`;

      const { error } = await supabase.storage
        .from("vehicles")
        .upload(filename, file);

      if (error) {
        alert(error.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("vehicles")
        .getPublicUrl(filename);

      uploaded.push(publicUrl);
    }

    setImages(uploaded);
    onUpload(uploaded);

    setLoading(false);
  }

  return (
    <div className="md:col-span-2">

      <div
        onClick={() => inputRef.current?.click()}
        className="flex h-56 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900 transition hover:border-red-600"
      >
        {loading ? (
          <p>Subiendo...</p>
        ) : (
          <div className="text-center">
            <p className="text-xl font-bold">
              📷 Agregar imágenes
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Haz clic para seleccionar fotografías
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={(e) => upload(e.target.files)}
      />

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt="Vehículo"
              className="h-40 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}