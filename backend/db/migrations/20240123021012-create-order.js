'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      colors: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sizes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      special_request: {
        type: Sequelize.STRING
      },
      design: {
        type: Sequelize.INTEGER
      },
      user_design: {
        type: Sequelize.INTEGER
      },
      workforce_race: {
        type: Sequelize.BOOLEAN
      },
      processed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};