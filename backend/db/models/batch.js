"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {

    static associate(models) {
      // define association here
      Batch.belongsTo(models.Product, { foreignKey: "productId" });
      Batch.belongsTo(models.Design, { foreignKey: "designId" });
      Batch.belongsTo(models.UserDesign, { foreignKey: "userDesignId" });
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
      },
      color: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      total_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      product_url: {
        allowNull: false,
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
