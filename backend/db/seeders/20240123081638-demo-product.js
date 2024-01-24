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
      id: 1,
      name: "T-Shirt",
      colors: "pink-red-green-blue",
      size: ["small", "medium", "large", "x-large"],
      description: "Sizes larger than xl will vary in price.",
      price: 9.99
    },
    {
      id: 2,
      name: "Sweater",
      colors: "blue-red-yellow-orange-white-black",
      size: ["x-small", "small", "medium", "large"],
      description: "Sizes larger than xl will vary in price.",
      price: 15.99
    },
    {
      id: 3,
      name: "Longsleeve",
      colors: "red-blue-black-white-gray",
      size: ["small", "medium", "large"],
      description: "Sizes larger than xl will vary in price.",
      price: 12.99
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
