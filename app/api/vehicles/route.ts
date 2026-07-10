import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("vehicles")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      images = [],
      ...vehicle
    } = body;

    // Crear vehículo
    const { data: newVehicle, error } = await supabaseAdmin
      .from("vehicles")
      .insert([
        {
          ...vehicle,
          image: images[0] ?? vehicle.image ?? "",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Guardar todas las imágenes
    if (images.length > 0) {
      const rows = images.map(
        (url: string, index: number) => ({
          vehicle_id: newVehicle.id,
          image_url: url,
          is_primary: index === 0,
        })
      );

      const { error: imageError } =
        await supabaseAdmin
          .from("vehicle_images")
          .insert(rows);

      if (imageError) {
        console.error(imageError);
      }
    }

    return NextResponse.json(
      newVehicle,
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Error interno.",
      },
      {
        status: 500,
      }
    );
  }
}