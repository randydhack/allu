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
      orderId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'Orders'}
      },
      cartId: {
        type: Sequelize.INTEGER,
        references: { model: 'Carts'}
      },
      xs: {
        type: Sequelize.INTEGER,
      },
      s: {
        type: Sequelize.INTEGER,
      },
      m: {
        type: Sequelize.INTEGER,
      },
      l: {
        type: Sequelize.INTEGER,
      },
      xl: {
        type: Sequelize.INTEGER,
      },
      xxl: {
        type: Sequelize.INTEGER,
      },
      xxxl: {
        type: Sequelize.INTEGER,
      },
      xxxxl: {
        type: Sequelize.INTEGER,
      },
      xxxxxl: {
        type: Sequelize.INTEGER,
      },
      designId: {
        type: Sequelize.INTEGER,
        references: { model: 'Designs'}
      },
      userDesignId: {
        type: Sequelize.INTEGER,
        references: { model: 'UserDesigns'}
      },
      note: {
        type: Sequelize.STRING,
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
