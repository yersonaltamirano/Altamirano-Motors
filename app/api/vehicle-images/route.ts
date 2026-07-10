import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      vehicle_id,
      image_url,
      is_primary = false,
    } = body;

    const { data, error } = await supabaseAdmin
      .from("vehicle_images")
      .insert([
        {
          vehicle_id,
          image_url,
          is_primary,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      id,
      vehicle_id,
    } = body;

    // Quitar portada actual
    const { error: resetError } = await supabaseAdmin
      .from("vehicle_images")
      .update({
        is_primary: false,
      })
      .eq("vehicle_id", vehicle_id);

    if (resetError) {
      return NextResponse.json(
        {
          error: resetError.message,
        },
        {
          status: 500,
        }
      );
    }

    // Asignar nueva portada
    const { data, error } = await supabaseAdmin
      .from("vehicle_images")
      .update({
        is_primary: true,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    const { id } = body;

    const { error } = await supabaseAdmin
      .from("vehicle_images")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}