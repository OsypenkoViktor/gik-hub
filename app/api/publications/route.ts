import { NextResponse } from "next/server";
import {
  Publication,
  PublicationTag,
} from "@/models/associations/associations";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pageSize = 10;
  const page = Number(url.searchParams.get("page")) || 1;
  const offset = (page - 1) * pageSize;
  try {
    const publications = await Publication.findAndCountAll({
      include: PublicationTag,
      limit: 10,
      offset: offset,
    });

    const totalPages = Math.ceil(publications.count / pageSize);

    return NextResponse.json({
      data: publications.rows,
      pagination: {
        totalItems: publications.count,
        totalPages: totalPages,
        currentPage: page,
        pageSize: pageSize,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Не вдалося отримати список публікацій",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
