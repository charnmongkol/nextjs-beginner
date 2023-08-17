import Menu from "@/models/Menu";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  try {
    await connect();
    const menus = await Menu.find(username && { username });
    return new NextResponse(JSON.stringify(menus), { status: 200 });
  } catch (error) {
    return new NextResponse("DB Error!", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const newMenu = new Menu(body);
  try {
    await connect();
    await newMenu.save();
    return new NextResponse("Menu has been created.", { status: 201 });
  } catch (error) {
    return new NextResponse("DB Error!", { status: 500 });
  }
};
