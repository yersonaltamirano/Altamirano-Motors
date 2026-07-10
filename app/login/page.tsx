"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/vehiculos");

    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">

      <form
        onSubmit={login}
        className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-10"
      >

        <h1 className="text-center text-4xl font-black text-white">
          Altamirano Motors
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Iniciar sesión
        </p>

        <div className="mt-10 space-y-5">

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none ring-red-600 focus:ring-2"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none ring-red-600 focus:ring-2"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-4 text-lg font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </div>

      </form>

    </main>
  );
}