import { NextResponse } from "next/server";
import sequelize from "@/database/dbInit";
import ForumTag from "@/models/forumtag";
import ForumTheme from "@/models/forumtheme";
const bcrypt = require("bcrypt");
import { hashPassword } from "@/helpers/hashGenerator";

export async function GET(req: Request) {
  ForumTag.hasMany(ForumTheme);
  ForumTheme.belongsTo(ForumTag);
  const data = await ForumTag.findAll({
    include: ForumTheme,
  });
  return NextResponse.json(data);
}
