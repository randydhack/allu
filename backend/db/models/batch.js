"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {

    static associate(models) {
      // define association here
      Batch.hasOne(models.Product, { foreignKey: "productId" });
      Batch.hasOne(models.Design, { foreignKey: "designId" });
      Batch.hasOne(models.UserDesign, { foreignKey: "userDesignId" });
      Batch.belongsTo(models.Order, { foreignKey: "orderId" });
      Batch.belongsTo(models.Cart, { foreignKey: "cartId" });
    }
  }
  Batch.init(
    {
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderId: {
        type: DataTypes.INTEGER,
      },
      cartId: {
        type: DataTypes.INTEGER,
      },
      xs: {
        type: DataTypes.INTEGER,
      },
      s: {
        type: DataTypes.INTEGER,
      },
      m: {
        type: DataTypes.INTEGER,
      },
      l: {
        type: DataTypes.INTEGER,
      },
      xl: {
        type: DataTypes.INTEGER,
      },
      xxl: {
        type: DataTypes.INTEGER,
      },
      xxxl: {
        type: DataTypes.INTEGER,
      },
      xxxxl: {
        type: DataTypes.INTEGER,
      },
      xxxxxl: {
        type: DataTypes.INTEGER,
      },
      designId: {
        type: DataTypes.INTEGER,
      },
      userDesignId: {
        type: DataTypes.INTEGER,
      },
      note: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: "Batch",
    }
  );
  return Batch;
};
