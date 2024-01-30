'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Products';
   return queryInterface.bulkInsert(options, [
    {
      id: 1,
      name: "T-Shirt",
      colors: JSON.stringify([{"name": "banana", "hex": "#F2EBA7"}, {"name": "bay", "hex": "#859285"}, {"name": "berry", "hex": "#714859"}, {"name": "black", "hex": "#1D2327"}, {"name": "blossom", "hex": "#F8BAC1"}, {"name": "blue jean", "hex": "#757C8A"}, {"name": "blue spruce", "hex": "#3A5651"}, {"name": "brick", "hex": "#883E44"}, {"name": "bright salmon", "hex": "#F36150"}, {"name": "burnt orange", "hex": "#F4832E"}, {"name": "butter", "hex": "#FAD575"}, {"name": "chalky mint", "hex": "#6BC3AE"}, {"name": "chambray", "hex": "#B9E0EE"}, {"name": "chili", "hex": "#943541"}, {"name": "china blue", "hex": "#2D3E56"}, {"name": "citrus", "hex": "#F7C25B"}, {"name": "crimson", "hex": "#C5545D"}, {"name": "crunchberry", "hex": "#EB6684"}, {"name": "denim", "hex": "#323A3E"}, {"name": "emerald", "hex": "#26645D"}, {"name": "flo blue", "hex": "#4D6CA8"}, {"name": "granite", "hex": "#4D6CA8"}, {"name": "graphite", "hex": "#333431"}, {"name": "grey", "hex": "#635D5A"}, {"name": "hemp", "hex": "#393E2C"}, {"name": "ice blue", "hex": "#6A7D82"}, {"name": "island reef", "hex": "#9CE5C8"}, {"name": "ivory", "hex": "#F7E9CE"}, {"name": "khaki", "hex": "#777451"}, {"name": "lagoon", "hex": "#47C0CE"}, {"name": "light green", "hex": "#689677"}, {"name": "melon", "hex": "#F48660"}, {"name": "midnight", "hex": "#2C3643"}, {"name": "moss", "hex": "#40442F"}, {"name": "mustard", "hex": "#D1B66B"}, {"name": "navy", "hex": "#2D3142"}, {"name": "neon pink", "hex": "#F24997"}, {"name": "neon orange", "hex": "#F2555A"}, {"name": "orchid", "hex": "#C8AAC9"}, {"name": "paprika", "hex": "#EC2C4F"}, {"name": "pepper", "hex": "#3E3735"}, {"name": "periwinkle", "hex": "#5C6DA0"}, {"name": "red", "hex": "#E20729"}, {"name": "royal caribe", "hex": "#2E82BB"}, {"name": "sandstone", "hex": "#A49B82"}, {"name": "sapphire", "hex": "#3CA4C3"}, {"name": "seafoam", "hex": "#82B2AD"}, {"name": "true navy", "hex": "#10263A"}, {"name": "vineyard", "hex": "#6A3D54"}, {"name": "violet", "hex": "#7D7CBA"}, {"name": "washed denim", "hex": "#6B84A4"}, {"name": "watermelon", "hex": "#F3585F"}, {"name": "white", "hex": "#EEEEEE"}, {"name": "yam", "hex": "#AD5931"},]),
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
   ], {})
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
