import { NextResponse } from "next/server";
import sequelize from "@/database/dbInit";
import User from "@/models/User";
import Role from "@/models/Role";
const bcrypt = require("bcrypt");
import { hashPassword } from "@/helpers/hashGenerator";

export async function POST(req: Request) {
  const { username, password, email } = await req.json();
  User.belongsToMany(Role, { through: "UserRoles" });
  Role.belongsToMany(User, { through: "UserRoles" });
  const transaction = await sequelize.transaction();
  try {
    const hash = await bcrypt.hash(password, 10); 

    const newUser = await User.create({
      username: username,
      password: hash,
      email: email,
    });

    const role = await Role.findOne({
      where: { name: "user" },
    });

    await newUser.addRole(role);
    await transaction.commit();
    return NextResponse.json({ message: newUser });
  } catch (error: any) {
    if (transaction) await transaction.rollback();
    if (error.name === "SequelizeUniqueConstraintError") {
      return NextResponse.json(
        { message: "Користувач з таким логіном або поштою вже існує" },
        { status: 405 }
      );
    } else {
      return NextResponse.json(
        { message: "Помилка при створенні користувача",error
         },
        { status: 500 }
      );
    }
  }
}
