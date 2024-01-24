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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users'}
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      products: {
        type: Sequelize.TEXT,
        defaultValue: JSON.stringify(["Test1", "Test2", "Test3"]),
        allowNull: false
    },
      special_request: {
        type: Sequelize.STRING
      },
      quote: {
        type: Sequelize.FLOAT
      },
      workforce_race: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      processed: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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