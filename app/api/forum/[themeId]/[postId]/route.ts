import { NextResponse } from "next/server";
//використовуємо моделі з явно налаштованими ассоціаціями.
import { ForumPost, ForumComment } from "@/models/associations/associations";

export async function GET(
  req: Request,
  { params }: { params: { postId: number } }
) {
  try {
    const currentPost = await ForumPost.findByPk(params.postId);
    if (!currentPost) return NextResponse.json({ error: "post not found" });
    const postComments = await currentPost.getForumComments();
    return NextResponse.json({ currentPost, postComments });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Не вдалося отримати данні посту",
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { authorId, text, ForumPostId, authorUsername } = await req.json();
    if (!authorId || !text || !ForumPostId || !authorUsername)
      return NextResponse.json(
        { error: "some data is missing!" },
        { status: 400 }
      );
    const newComment = await ForumComment.create({
      authorId: authorId,
      text: text,
      ForumPostId: ForumPostId,
      authorUsername: authorUsername,
    });
    return NextResponse.json({
      message: "Comment has been created",
      newComment: newComment,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Не вдалося створити коментар",
        error: error,
      },
      { status: 500 }
    );
  }
}
