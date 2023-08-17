import Menu from "@/models/Menu";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    const menu = await Menu.findById(id);

    return new NextResponse(JSON.stringify(menu), { status: 200 });
  } catch (error) {
    return new NextResponse("DB error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    await Menu.findByIdAndDelete(id);

    return new NextResponse("Menu has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("DB error", { status: 500 });
  }
};
