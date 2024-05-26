import { NextResponse } from "next/server";
import {ForumTag, ForumTheme} from "@/models/associations/associations"


export async function GET(req: Request) {
  try {
   
    const data = await ForumTag.findAll({
      include: ForumTheme,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Не вдалося отримати данні", error: { error } },
      { status: 500 }
    );
  }
}
