'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Products';
   return queryInterface.bulkInsert(options, [
    {
      name: "T-Shirt",
      colors: "pink-red-green-blue",
      size: "xxs-xs-s-m-l-xl-xxl",

    },
    {
      name: "Sweater",
      colors: "blue-red-yellow-orange-white-black",
      size: "s-m-l-xl-xxl",
    },
    {
      name: "Longsleeve",
      colors: "red-blue-black-white-gray",
      size: "xs-s-m-l-xl",
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Products';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['T-Shirt', 'Sweater', 'Longsleeve']
      }
    }, {});
  }
};
