import { NextResponse } from "next/server";
import {ForumTheme} from "@/models/associations/associations";


export async function GET(
  req: Request,
  { params }: { params: { themeId: number } }
) {

  const currentTheme = await ForumTheme.findByPk(params.themeId);
  const data = await currentTheme.getForumPosts();
  return NextResponse.json(data);
}
