import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const updatedEndpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${q}`;

  const options = {
    method: "GET",
    headers: {
      "User-Agent":
        "Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)",
    },
  };

  const { data, status } = await axios(updatedEndpoint, options);

  const available = status === 404;

  return NextResponse.json({ available });
}
