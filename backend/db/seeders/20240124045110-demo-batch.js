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
        XS: 5,
        S:5,
        M: 5,
        designId: 3
      },
      {
        id: 2,
        productId: 2,
        S: 5,
        M: 5,
        L: 10,
        designId: 2
      },
      {
        id: 3,
        productId: 3,
        L: 5,
        XL: 10,
        "2XL": 10,
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
