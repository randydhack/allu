"use strict";
const { Model } = require("sequelize");
// const ProductImage = require('./productimage')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductImage, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Product.hasMany(models.Batch, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      colors: {
        allowNull: false,
        type: DataTypes.TEXT,
        get() {
          // Parse the stored JSON string into an array
          const value = this.getDataValue("colors");
          return value ? JSON.parse(value) : [];
        },
        set(value) {
          // Store the array as a JSON string
          this.setDataValue("colors", JSON.stringify(value));
        },
      },
      size: {
        allowNull: false,
        type: DataTypes.TEXT,
        get() {
          // Parse the stored JSON string into an array
          const value = this.getDataValue("size");
          return value ? JSON.parse(value) : [];
        },
        set(value) {
          // Store the array as a JSON string
          this.setDataValue("size", JSON.stringify(value));
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Product",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Product;
};
