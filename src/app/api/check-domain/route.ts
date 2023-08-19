import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import axios from "axios";

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const domains = await kv.get(`${q}-domains`);

  if (domains) {
    return NextResponse.json(domains);
  } else {
    // cache miss
    const options = {
      method: "GET",
      url: `https://pointsdb-bulk-domain-check-v1.p.rapidapi.com/domain_check?domains=${q}`,
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "pointsdb-bulk-domain-check-v1.p.rapidapi.com",
      },
    };

    const { data } = await axios(options);

    // store in the cache
    await kv.set(`${q}-domains`, data);

    return NextResponse.json(data);
  }
}
