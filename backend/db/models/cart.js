'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey:'userId' })
      Cart.belongsToMany(models.Batch, {through: "CartBatches"})
      // didn't understand the product to batches association in Order model
    }
  }
  Cart.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    batches: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        // Parse the stored JSON string into an array
        const value = this.getDataValue('batches');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        // Store the array as a JSON string
        this.setDataValue('batches', JSON.stringify(value));
      },
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
