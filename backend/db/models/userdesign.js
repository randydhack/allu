'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDesign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDesign.belongsTo(models.User, { foreignKey: 'userId' })
      UserDesign.hasMany(models.Batch, { foreignKey: 'userDesignId' })
    }
  }
  UserDesign.init({
    img_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'UserDesign',
  });
  return UserDesign;
};