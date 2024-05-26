import { NextResponse } from "next/server";
import Publication from "@/models/Publication";

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
  try {
    const publication = await Publication.findByPk(params.publicationId);
    return NextResponse.json(publication);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "помилка при отриманні публікації", error: error },
      { status: 500 }
    );
  }
}
