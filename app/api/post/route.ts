import { NextResponse } from "next/server";
import sequelize from "@/database/dbInit";
import ForumPost from "@/models/forumpost";
import ForumTheme from "@/models/forumtheme";
const bcrypt = require("bcrypt");
import { hashPassword } from "@/helpers/hashGenerator";

export async function POST(req: Request) {
  const data = await req.json();
  const newPost = await ForumPost.create(data);
  return NextResponse.json(newPost);
}
