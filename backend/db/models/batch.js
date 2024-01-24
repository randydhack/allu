'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Batch.hasOne(models.Product, { foreignKey:'productId' })
      Batch.hasOne(models.Design, { foreignKey:'designId' })
      Batch.hasOne(models.UserDesign, { foreignKey:'userDesignId' })
      Batch.belongsToMany(models.Order, { through: "OrderProducts"})
      Batch.belongsToMany(models.Cart, { through: "CartProducts"})
    }
  }
  Batch.init({
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    XS: DataTypes.INTEGER,
    S: DataTypes.INTEGER,
    M: DataTypes.INTEGER,
    "L": DataTypes.INTEGER,
    "XL": DataTypes.INTEGER,
    "2XL": DataTypes.INTEGER,
    "3XL": DataTypes.INTEGER,
    "4XL": DataTypes.INTEGER,
    "5XL:": DataTypes.INTEGER,
    designId: {
      type: DataTypes.INTEGER,
    },
    userDesignId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Batch',
  });
  return Batch;
};
