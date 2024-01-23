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
      Order.hasOne(models.UserDesign, { foreignKey: 'user_design' })
      Order.hasOne(models.Design, { foreignKey: 'design' })
      Order.hasMany(models.Product, { foreignKey: 'productId' })
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
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    colors: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sizes: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    special_request: DataTypes.STRING,
    design: DataTypes.INTEGER,
    user_design: DataTypes.INTEGER,
    workforce_race: DataTypes.BOOLEAN,
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