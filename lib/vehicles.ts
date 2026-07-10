import { supabase } from "./supabase";

export async function getVehicles() {
  const { data, error } = await supabase.from("vehicles").select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  return data ?? [];
}