'use strict';
/** @type {import('sequelize-cli').Migration} */
const{ productImageSeeders, undoProductImages } = require('../seederScripts');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="ProductImages";
    const product = await productImageSeeders()
    return queryInterface.bulkInsert(options, product, {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    const undo = await undoProductImages()
    return queryInterface.bulkDelete(options, {
      productId: {
        [Op.in]: undo
      }
    }, {});
  }
};