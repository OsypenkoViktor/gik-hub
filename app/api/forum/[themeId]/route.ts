import { NextResponse } from "next/server";
import sequelize from "@/database/dbInit";
import ForumPost from "@/models/forumpost";
import ForumTheme from "@/models/forumtheme";
const bcrypt = require("bcrypt");
import { hashPassword } from "@/helpers/hashGenerator";

export async function GET(
  req: Request,
  { params }: { params: { themeId: number } }
) {
  ForumTheme.hasMany(ForumPost);
  ForumPost.belongsTo(ForumTheme);
  const currentTheme = await ForumTheme.findByPk(params.themeId);
  const data = await currentTheme.getForumPosts();
  return NextResponse.json(data);
}
