'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Carts"

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="Carts";
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        userId: 1
      },
      {
        id: 2,
        userId: 2,
      },
      {
        id: 3,
        userId: 3,
      },
      {
        id: 4,
        userId: 4,
      },
      {
        id: 5,
        userId: 5,
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Carts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {});
  }
};
