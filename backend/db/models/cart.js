'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {

      Cart.belongsTo(models.User, { foreignKey:'userId' })
      Cart.belongsToMany(models.Batch, {through: "CartBatches"})
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
