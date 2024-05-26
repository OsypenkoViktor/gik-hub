const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";
import Publication from "@/models/Publication";


const PublicationTag = sequelize.define("PublicationsTag", {
      tag:{
        allowNull: false,
        type: DataTypes.STRING,
      },
});


export default PublicationTag;
