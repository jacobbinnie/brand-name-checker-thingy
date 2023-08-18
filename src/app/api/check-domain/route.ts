import { NextRequest, NextResponse } from "next/server";

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const updatedEndpoint = `https://pointsdb-bulk-domain-check-v1.p.rapidapi.com/domain_check?domains=${q}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "pointsdb-bulk-domain-check-v1.p.rapidapi.com",
    },
  };

  const res = await fetch(updatedEndpoint, options);

  return new NextResponse(res.body, { status: res.status });
}
