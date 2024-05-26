import { NextResponse } from "next/server";
import { ForumTheme } from "@/models/associations/associations";

export async function GET(
  req: Request,
  { params }: { params: { themeId: number } }
) {
  try {
    const currentTheme = await ForumTheme.findByPk(params.themeId);
    const data = await currentTheme.getForumPosts();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Не вдалося отримати пости обраної теми", error: error },
      { status: 500 }
    );
  }
}
