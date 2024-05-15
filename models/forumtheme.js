const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";
import ForumPost from "./forumpost";

const ForumTheme = sequelize.define("ForumTheme", {
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  forumTagId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

ForumTheme.hasMany(ForumPost);

export default ForumTheme;
