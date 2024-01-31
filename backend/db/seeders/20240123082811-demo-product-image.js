'use strict';
/** @type {import('sequelize-cli').Migration} */
const { hoodieSeeder } = require("../seederScripts");
const { undoHoodie } = require("../seederScripts");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="ProductImages";
    return queryInterface.bulkInsert(options, hoodieSeeder(), {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      productId: {
        [Op.in]: undoHoodie()
      }
    }, {});
  }
};
