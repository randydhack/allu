'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="Designs";
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/boxing.png"
      },
      {
        id: 2,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/bowling.png"
      },
      {
        id: 3,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/biking.png"
      },
      {
        id: 4,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/bowling.png"
      },
      {
        id: 5,
        design_url: "https://www.uberprints.com/assets/images/templates/cat/cheerleading.png"
      },
     ])
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
