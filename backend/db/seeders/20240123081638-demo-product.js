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
      colors: JSON.stringify(["pink", "red", "green", "blue"]),
      size: JSON.stringify(["small", "medium", "large", "x-large"]),
      description: "Sizes larger than xl will vary in price.",
      price: 9.99
    },
    {
      id: 2,
      name: "Sweater",
      colors: JSON.stringify(["black", "orange", "pink", "red", "green", "blue"]),
      size: JSON.stringify(["x-small", "small", "medium", "large"]),
      description: "Sizes larger than xl will vary in price.",
      price: 15.99
    },
    {
      id: 3,
      name: "Longsleeve",
      colors: JSON.stringify(["red", "blue", "black", "pink", "red", "green", "blue"]),
      size: JSON.stringify(["small", "medium", "large"]),
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
