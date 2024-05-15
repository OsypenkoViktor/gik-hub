const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";
import User from "./User";

const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Role;
