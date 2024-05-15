const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";
import Role from "./Role";
import User from "./User";

const UserRoles = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserRoles.belongsTo(User, { foreignKey: "userId" });

// Связь с моделью Role
UserRoles.belongsTo(Role, { foreignKey: "roleId" });

export default User;
