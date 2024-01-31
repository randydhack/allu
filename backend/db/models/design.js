"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Design extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Design.hasMany(models.Batch);
    }
  }
  Design.init(
    {
      design_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      text_layers: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      design_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Design",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Design;
};
