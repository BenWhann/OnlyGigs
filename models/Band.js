const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Band extends Model {}

Band.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    band_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    band_description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "band",
  }
);

module.exports = Band;
