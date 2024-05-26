const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";


const ForumPost = sequelize.define("ForumPost", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  forumThemeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default ForumPost;
