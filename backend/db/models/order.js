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
      Order.belongsTo(models.User, { foreignKey:'userId' })
      Order.belongsToMany(models.Batch, { through: "OrderBatches"})
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
    products: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        // Parse the stored JSON string into an array
        const value = this.getDataValue('products');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        // Store the array as a JSON string
        this.setDataValue('products', JSON.stringify(value));
      },
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
