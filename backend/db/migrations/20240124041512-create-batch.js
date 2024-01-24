'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Batches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Products'}
      },
      XS: {
        type: Sequelize.INTEGER
      },
      S: {
        type: Sequelize.INTEGER
      },
      M: {
        type: Sequelize.INTEGER
      },
      L: {
        type: Sequelize.INTEGER
      },
      XL: {
        type: Sequelize.INTEGER
      },
      "2XL": {
        type: Sequelize.INTEGER
      },
      "3XL": {
        type: Sequelize.INTEGER
      },
      "4XL": {
        type: Sequelize.INTEGER
      },
      "5XL": {
        type: Sequelize.INTEGER
      },
      designId: {
        type: Sequelize.INTEGER,
        references: { model: 'Designs'}
      },
      userDesignId: {
        type: Sequelize.INTEGER,
        references: { model: 'UserDesigns'}
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
    await queryInterface.dropTable('Batches');
  }
};
