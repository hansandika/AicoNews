import { retrieveNewsWithGrouping } from "@/lib/utils_chromadb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  const result = await retrieveNewsWithGrouping(query);
  return Response.json({ "relatedNews": result }, { status: 200 });
}