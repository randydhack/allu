'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="Designs";
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/boxing.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 2,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/bowling.png",
        text_layers: 3,
        design_price: 2.00
      },
      {
        id: 3,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/biking.png",
        text_layers: 1,
        design_price: 0.50
      },
      {
        id: 4,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/bowling.png",
        text_layers: 0,
        design_price: 0.00
      },
      {
        id: 5,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/cheerleading.png",
        text_layers: 2,
        design_price: 1.00
      },
     ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Designs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {});
  }
};
