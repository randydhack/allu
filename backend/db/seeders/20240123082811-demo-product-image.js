'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="ProductImages";
    return queryInterface.bulkInsert(options, [
      {
        productId: 1,
        img_url: "https://cdnp.sanmar.com/medias/sys_master/images/images/hbc/h92/10234018922526/9671-Crunchberry-1-1717CrunchberryModelFront-337W.jpg",
        description: "Basic shirt made of cotton. Soft-washed, garment-dyed fabric.",
        color: "pink",
      },
      {
        productId: 2,
        img_url: "https://cdnp.sanmar.com/medias/sys_master/images/images/h14/h0a/11351843831838/115-HtSptRoyal-1-18500HtSptRoyalModelFront-337W.jpg",
        description: "Basic sweater made of cotton. Spandex material. Front pouch pocket.",
        color: "blue",
      },
      {
        productId: 3,
        img_url: "https://cdnp.sanmar.com/medias/sys_master/images/images/he9/hef/10232928534558/790-Brick-1-6014BrickModelFront-337W.jpg",
        description: "Longsleeve top. Rib knit cuffs. Relaxed fit.",
        color: "red",
      },
     ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      productId: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
