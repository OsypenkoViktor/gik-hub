import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import PublicationLike from "@/models/publicationLike";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      publicationId: number;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "unauth" }, { status: 403 });
  }
  try {
    const existingLike = await PublicationLike.findOne({
      where: { userId: session.user.id, publicationId: params.publicationId },
    });
    if (existingLike) {
      await existingLike.destroy();
      const totalLikes = await PublicationLike.count();
      return NextResponse.json({ totalLikes: totalLikes });
    } else {
      await PublicationLike.create({
        userId: session.user.id,
        publicationId: params.publicationId,
      });
      const totalLikes = await PublicationLike.count();
      return NextResponse.json({ totalLikes: totalLikes }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "server error", error: error },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      publicationId: number;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "unauth" }, { status: 403 });
  }
  try {
    const existingLike = await PublicationLike.findOne({
      where: { userId: session.user.id, publicationId: params.publicationId },
    });
    if (existingLike) {
      const totalLikes = await PublicationLike.count();
      return NextResponse.json({ totalLikes: totalLikes }, { status: 200 });
    } else {
      const totalLikes = await PublicationLike.count();
      return NextResponse.json({ totalLikes: totalLikes }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Не вдалося оновити інформацію про лайк", error: error },
      { status: 500 }
    );
  }
}
