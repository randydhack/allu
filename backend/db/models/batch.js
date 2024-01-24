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
    }
  }
  Batch.init({
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    xs: DataTypes.INTEGER,
    s: DataTypes.INTEGER,
    m: DataTypes.INTEGER,
    l: DataTypes.INTEGER,
    xl: DataTypes.INTEGER,
    xxl: DataTypes.INTEGER,
    xxxl: DataTypes.INTEGER,
    xxxxl: DataTypes.INTEGER,
    xxxxxl: DataTypes.INTEGER,
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