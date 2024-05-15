const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";

const ForumTag = sequelize.define("ForumTag", {
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default ForumTag;
