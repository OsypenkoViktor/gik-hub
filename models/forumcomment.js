const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";

const ForumComment = sequelize.define("ForumComment", {
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  authorUsername:{
    type:DataTypes.STRING,
    allowNull:false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ForumPostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default ForumComment;
