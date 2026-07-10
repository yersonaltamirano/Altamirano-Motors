import { supabase } from "./supabase";

export async function addVehicle(vehicle: any) {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([vehicle]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}