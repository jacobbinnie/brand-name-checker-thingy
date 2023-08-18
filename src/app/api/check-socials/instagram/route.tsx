import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const updatedEndpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${q}`;

  const options = {
    method: "GET",
    url: "https://check-username.p.rapidapi.com/check/instagram/username",
    headers: {
      "X-RapidAPI-Key": "9d141b7d56msh6670ba72bcfef10p10cc9cjsnf1fe5fa69209",
      "X-RapidAPI-Host": "check-username.p.rapidapi.com",
    },
  };

  const { data, status } = await axios(updatedEndpoint, options);

  const available = status === 404;

  return NextResponse.json({ available });
}
