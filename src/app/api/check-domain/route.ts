import { NextRequest, NextResponse } from "next/server";

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const updatedEndpoint = `https://zozor54-whois-lookup-v1.p.rapidapi.com/?domain=${q}&format=json&_forceRefresh=0`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "zozor54-whois-lookup-v1.p.rapidapi.com",
    },
  };

  const res = await fetch(updatedEndpoint, options);

  return new NextResponse(res.body, { status: res.status });
}
