'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="Orders";
    return queryInterface.bulkInsert('Orders', [
      {
        id: 1,
        userId: 2,
        address: "123 Fargo Street",
        productId: 1,
        colors: "red-pink",
        sizes: "30red-40pink",
        design: 1,
        workforce_race: false,
        processed: true,
        special_request: "I am a little lost on designs, so I picked one from your selection."
      },
      {
        id: 2,
        userId: 3,
        address: "456 Jango Street",
        productId: 2,
        colors: "blue-red",
        sizes: "50blue-30red",
        design: 5,
        workforce_race: false,
        processed: false,

      },
      {
        id: 3,
        userId: 4,
        address: "789 Ground Street",
        productId: 3,
        colors: "black-blue",
        sizes: "30black-70blue",
        user_design: 3,
        workforce_race: true,
        processed: false,
        special_request: "Make this order snappy"
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
