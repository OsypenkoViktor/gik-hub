const { DataTypes } = require("sequelize");
import sequelize from "@/database/dbInit";


const Publication = sequelize.define("Publication", {
      userId:{
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{
          len:[10,50]
        }
      },
      text:{
        allowNull:false,
        type:DataTypes.TEXT,
      },
      isModerated:{
        allowNull:false,
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      }
});




export default Publication;
