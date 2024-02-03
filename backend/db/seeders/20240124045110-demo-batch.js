"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Batches";
    return queryInterface.bulkInsert(
      options,
      [
        {
          id: 1,
          productId: 1,
          orderId: 1,
          cartId: 2,
          xs: 5,
          s: 5,
          m: 5,
          designId: 3,
          note: "All tshirts have this design",
          color: "banana",
          total_price: 41.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/tshirt/comfort_colors_banana.jpg`
        },
        {
          id: 2,
          productId: 2,
          cartId: 2,
          s: 5,
          m: 5,
          l: 10,
          designId: 2,
          note: "I want to replace the text with: \"Summer Camp\"",
          color: "ash",
          total_price: 81.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_ash.jpg`
        },
        {
          id: 3,
          productId: 3,
          cartId: 2,
          l: 5,
          xl: 10,
          xxl: 10,
          designId: 4,
          note: "The xl sizes and above should have bigger logos",
          color: "black",
          total_price: 121.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/lighttshirt/District_Tee_black.jpg`
        },
        {
          id: 4,
          productId: 2,
          cartId: 3,
          l: 3,
          xl: 12,
          xxl: 13,
          designId: 10,
          note: "Can i have the logo black and white instead of these colors",
          color: "black",
          total_price: 201.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_black.jpg`
        },
        {
          id: 5,
          productId: 2,
          cartId: 1,
          l: 3,
          xl: 12,
          xxl: 13,
          designId: 29,
          note: "All tshirts have this design",
          color: "black",
          total_price: 201.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_black.jpg`
        },
        {
          id: 6,
          productId: 2,
          orderId: 1,
          l: 3,
          xl: 12,
          xxl: 13,
          designId: 18,
          note: "All tshirts have this design",
          color: "light_pink",
          total_price: 201.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_light_pink.jpg`
        },
        {
          id: 7,
          productId: 2,
          orderId: 4,
          l: 3,
          xl: 12,
          xxl: 13,
          designId: 22,
          note: "All tshirts have this design",
          color: "cherry_red",
          total_price: 201.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_cherry_red.jpg`
        },
        {
          id: 8,
          productId: 1,
          orderId: 4,
          xs: 1,
          m: 3,
          xxl: 14,
          designId: 14,
          note: "All tshirts have this design",
          color: "butter",
          total_price: 201.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/tshirt/Comfort_Colors_butter.jpg`
        },
        {
          id: 9,
          productId: 3,
          orderId: 4,
          s: 10,
          m: 3,
          l: 1,
          designId: 13,
          note: "All tshirts have this design",
          color: "new_navy",
          total_price: 201.0,
          product_url: `https://allutestbucket.s3.amazonaws.com/lighttshirt/District_Tee_new_navy.jpg`
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Batches";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: {
          [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      },
      {}
    );
  },
};
