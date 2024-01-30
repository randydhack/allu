'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'userId' })
      Order.hasMany(models.Batch, { foreignKey: "orderId"})
      // didn't understand the product to batches association in Cart model
    }
  }
  Order.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    special_request: DataTypes.STRING,
    quote: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    workforce_race: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    processed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
