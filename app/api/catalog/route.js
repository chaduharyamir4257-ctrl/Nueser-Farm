import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { samplePlants, sampleFertilizers } from "@/data/sampleData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") || 10)));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const source = type === "fertilizers" ? "fertilizers" : "plants";
  const fallback = source === "fertilizers" ? sampleFertilizers : samplePlants;

  if (!supabase) {
    return NextResponse.json({
      items: fallback.filter((item) => item.in_stock !== false).slice(from, to + 1),
      total: fallback.filter((item) => item.in_stock !== false).length,
    });
  }

  const { data, count, error } = await supabase
    .from(source)
    .select("*", { count: "exact" })
    .eq("in_stock", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json(
      {
        items: fallback.filter((item) => item.in_stock !== false).slice(from, to + 1),
        total: fallback.filter((item) => item.in_stock !== false).length,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    items: data || [],
    total: count || 0,
  });
}
