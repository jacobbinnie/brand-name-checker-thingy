import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { kv } from "@vercel/kv";
import { SocialPlatform } from "@/app/interfaces/socialPlatforms";

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY || "";

export async function GET(request: NextRequest) {
  console.log("Fetching socials");
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const socials = await kv.get<Record<SocialPlatform, boolean>>(`${q}-socials`);

  if (socials) {
    console.log("Fetched from cache");
    // return from cache
    return NextResponse.json(socials);
  } else {
    console.log("Cache miss - fetch from api");
    const options = {
      method: "GET",
      url: `https://check-username.p.rapidapi.com/check/${q}`,
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "check-username.p.rapidapi.com",
      },
    };

    const { data } = await axios(options);

    const { username, success, ...rest } = data;

    await kv.set<Record<SocialPlatform, boolean>>(`${q}-socials`, rest);

    return NextResponse.json(rest);
  }
}
