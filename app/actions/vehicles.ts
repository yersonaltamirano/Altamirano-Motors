"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createVehicle(data: {
  brand: string;
  model: string;
  version: string;
  year: number;
  km: string;
  fuel: string;
  transmission: string;
  price: string;
  color: string;
  engine: string;
  traction: string;
  description: string;
  image: string;
  featured: boolean;
}) {
  const { error } = await supabaseAdmin
    .from("vehicles")
    .insert([data]);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/vehiculos");
}

export async function updateVehicle(
  id: number,
  data: {
    brand: string;
    model: string;
    version: string;
    year: number;
    km: string;
    fuel: string;
    transmission: string;
    price: string;
    color: string;
    engine: string;
    traction: string;
    description: string;
    image: string;
    featured: boolean;
  }
) {
  const { error } = await supabaseAdmin
    .from("vehicles")
    .update(data)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/vehiculos");
}

export async function deleteVehicle(id: number) {
  const { error } = await supabaseAdmin
    .from("vehicles")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/vehiculos");
}