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
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_1.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 2,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_2.png",
        text_layers: 3,
        design_price: 2.00
      },
      {
        id: 3,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_1.png",
        text_layers: 1,
        design_price: 0.50
      },
      {
        id: 4,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_1.png",
        text_layers: 0,
        design_price: 0.00
      },
      {
        id: 5,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_5.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 6,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_6.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 7,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_7.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 8,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_8.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 9,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_9.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 10,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_10.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 11,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_11.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 12,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_12.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 13,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_13.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 14,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_14.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 15,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_15.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 16,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_17.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 17,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_18.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 18,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_19.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 19,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_20.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 20,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_21.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 21,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_22.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 22,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_23.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 23,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_24.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 24,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_25.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 25,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_26.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 26,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_27.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 27,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_28.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 28,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_29.png",
        text_layers: 2,
        design_price: 1.00
      },
      {
        id: 29,
        design_url: "https://allutestbucket.s3.amazonaws.com/aventura_30.png",
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
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
      }
    }, {});
  }
};
