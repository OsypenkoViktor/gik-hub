const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";

const PublicationLike = sequelize.define("PublicationLike", {
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  publicationId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

export default PublicationLike;
