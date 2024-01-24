'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="Batches";
    return queryInterface.bulkInsert('Batches', [
      {
        id: 1,
        productId: 1,
        xs: 5,
        s:5,
        m: 5,
        designId: 3
      },
      {
        id: 2,
        productId: 2,
        s: 5,
        m: 5,
        l: 10,
        designId: 2
      },
      {
        id: 3,
        productId: 3,
        l: 5,
        xl: 10,
        xxl: 10,
        userDesignId: 4
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Batches';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};