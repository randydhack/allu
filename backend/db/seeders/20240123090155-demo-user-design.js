'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="UserDesigns";
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        img_url: "https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/2fdbd7ab-f378-4c63-8b21-c944ad2633fd/header_t-shirts2.jpg",
        userId: 2
      },
      {
        id: 2,
        img_url: "https://cdn.logojoy.com/wp-content/uploads/20220316180959/event-t-shirt-design-ideas-600x600.jpg",
        userId: 3
      },
      {
        id: 3,
        img_url: "https://files.cdn.printful.com/o/upload/bfl-image/bc/10350_l_support%20local%20businesses.jpg",
        userId: 4
      },
      {
        id: 4,
        img_url: "https://i.pinimg.com/474x/a1/7e/23/a17e23192907c8bfed8d6cb6923107e0.jpg",
        userId: 5
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserDesigns';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4]
      }
    }, {});
  }
};
