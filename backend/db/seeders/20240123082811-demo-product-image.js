'use strict';
/** @type {import('sequelize-cli').Migration} */
const{ hoodieSeeders } = require('../seederScripts');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="ProductImages";
    const hoodie = await hoodieSeeders()
    return queryInterface.bulkInsert(options, hoodie , {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      productId: {
        [Op.in]: [
          1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
         11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
         21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
         31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
         41, 42, 43
       ]
      }
    }, {});
  }
};