'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="Orders";
// Get existing batch data
const existingBatches = await queryInterface.sequelize.query(
  'SELECT * FROM Batches',
  { type: Sequelize.QueryTypes.SELECT }
);

    return queryInterface.bulkInsert('Orders', [
      {
        id: 1,
        userId: 2,
        address: "123 Fargo Street",
        products: JSON.stringify(existingBatches[0]),
        special_request: "I am a little lost on designs, so I picked one from your selection.",
        quote: 1.50,
        workforce_race: false,
        processed: true,
      },
      {
        id: 2,
        userId: 3,
        address: "456 Jango Street",
        products: JSON.stringify([existingBatches[1]]),
        quote: 400.50,
        workforce_race: false,
        processed: false,
      },
      {
        id: 3,
        userId: 4,
        address: "789 Ground Street",
        products: JSON.stringify([existingBatches[2]]),
        quote: 505.50,
        special_request: "Make this order snappy",
        workforce_race: true,
        processed: false,
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Orders';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
