import { NextResponse } from "next/server";
import ForumPost from "@/models/forumpost";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newPost = await ForumPost.create(data);
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json(
      { message: "Не вдалося створити пост.", error: error },
      { status: 500 }
    );
  }
}
