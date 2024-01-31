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
      name: "Heavy T-Shirt",
      size: JSON.stringify(["small", "medium", "large", "x-large", "2x-large", "3x-large"]),
      description: "Sizes larger than xl will vary in price.",
      colors: JSON.stringify([{"name": "banana", "hex": "#F2EBA7"}, {"name": "bay", "hex": "#859285"}, {"name": "berry", "hex": "#714859"}, {"name": "black", "hex": "#1D2327"}, {"name": "blossom", "hex": "#F8BAC1"}, {"name": "blue jean", "hex": "#757C8A"}, {"name": "blue spruce", "hex": "#3A5651"}, {"name": "brick", "hex": "#883E44"}, {"name": "bright salmon", "hex": "#F36150"}, {"name": "burnt orange", "hex": "#F4832E"}, {"name": "butter", "hex": "#FAD575"}, {"name": "chalky mint", "hex": "#6BC3AE"}, {"name": "chambray", "hex": "#B9E0EE"}, {"name": "chili", "hex": "#943541"}, {"name": "china blue", "hex": "#2D3E56"}, {"name": "citrus", "hex": "#F7C25B"}, {"name": "crimson", "hex": "#C5545D"}, {"name": "crunchberry", "hex": "#EB6684"}, {"name": "denim", "hex": "#323A3E"}, {"name": "emerald", "hex": "#26645D"}, {"name": "flo blue", "hex": "#4D6CA8"}, {"name": "granite", "hex": "#4D6CA8"}, {"name": "graphite", "hex": "#333431"}, {"name": "grey", "hex": "#635D5A"}, {"name": "hemp", "hex": "#393E2C"}, {"name": "ice blue", "hex": "#6A7D82"}, {"name": "island reef", "hex": "#9CE5C8"}, {"name": "ivory", "hex": "#F7E9CE"}, {"name": "khaki", "hex": "#777451"}, {"name": "lagoon", "hex": "#47C0CE"}, {"name": "light green", "hex": "#689677"}, {"name": "melon", "hex": "#F48660"}, {"name": "midnight", "hex": "#2C3643"}, {"name": "moss", "hex": "#40442F"}, {"name": "mustard", "hex": "#D1B66B"}, {"name": "navy", "hex": "#2D3142"}, {"name": "neon pink", "hex": "#F24997"}, {"name": "neon orange", "hex": "#F2555A"}, {"name": "orchid", "hex": "#C8AAC9"}, {"name": "paprika", "hex": "#EC2C4F"}, {"name": "pepper", "hex": "#3E3735"}, {"name": "periwinkle", "hex": "#5C6DA0"}, {"name": "red", "hex": "#E20729"}, {"name": "royal caribe", "hex": "#2E82BB"}, {"name": "sandstone", "hex": "#A49B82"}, {"name": "sapphire", "hex": "#3CA4C3"}, {"name": "seafoam", "hex": "#82B2AD"}, {"name": "true navy", "hex": "#10263A"}, {"name": "vineyard", "hex": "#6A3D54"}, {"name": "violet", "hex": "#7D7CBA"}, {"name": "washed denim", "hex": "#6B84A4"}, {"name": "watermelon", "hex": "#F3585F"}, {"name": "white", "hex": "#EEEEEE"}, {"name": "yam", "hex": "#AD5931"},]),
      price: 9.99
    },
    {
      id: 2,
      name: "Light T-shirt",
      size: JSON.stringify(["x-small","small", "medium", "large", "x-large", "2x-large", "3x-large", "4x-large"]),
      description: "Sizes larger than xl will vary in price.",
      colors: JSON.stringify([{"name": "black frost", "hex": "#313332"}, {"name": "black", "hex": "#1B1B19"},{"name": "blush frost", "hex": "#C87572"},{"name": "fuchsia frost", "hex": "#F0679C"},{"name": "green frost", "hex": "#46CE82"},{"name": "grey frost", "hex": "#959595"},{"name": "heather charcoal", "hex": "#625D5F"},{"name": "heathered teal", "hex": "#087C7C"},{"name": "maritime frost", "hex": "#708CC0"},{"name": "maroon frost", "hex": "#7C4248"},{"name": "navy frost", "hex": "#536072"},{"name": "new navy", "hex": "#303841"},{"name": "purple frost", "hex": "#71639C"},{"name": "red frost", "hex": "#C64F57"},{"name": "royal frost", "hex": "#7595DC"},{"name": "turqoise frost", "hex": "#39B3E8"},]),
      price: 9.99
    },
    {
      id: 3,
      name: "Hoodie",
      size: JSON.stringify(["small", "medium", "large", "x-large", "2x-large", "3x-large", "4x-large", "5x-large"]),
      description: "Sizes larger than xl will vary in price.",
      colors: JSON.stringify([{"name": "antique cherry red", "hex": "#7C0418"}, {"name": "antique sapphire", "hex": "#1C5674"}, {"name": "ash", "hex": "#D8D8D8"}, {"name": "azalea", "hex": "#F58AB5"}, {"name": "black", "hex": "#1D2327"}, {"name": "cardinal red", "hex": "#6D1427"}, {"name": "carolina blue", "hex": "#799CDB"}, {"name": "charcoal", "hex": "#5F6260"}, {"name": "cherry red", "hex": "#9B1127"}, {"name": "dark chocolate", "hex": "#351F1B"}, {"name": "dark heather", "hex": "#374248"}, {"name": "forest green", "hex": "#1F2D17"}, {"name": "garnet", "hex": "#530612"}, {"name": "gold", "hex": "#DE9D27"}, {"name": "graphite heather", "hex": "#808283"}, {"name": "sport dark green", "hex": "#445B4F"}, {"name": "sport dark maroon", "hex": "#63343D"}, {"name": "sport dark navy", "hex": "#3E4453"}, {"name": "heather sport royal", "hex": "#4D71B7"}, {"name": "heather sport scarlet", "hex": "#4D71B7"}, {"name": "heliconia", "hex": "#BA3572"}, {"name": "indigo blue", "hex": "#495A71"}, {"name": "irish green", "hex": "#328D48"}, {"name": "light blue", "hex": "#A1BFD9"}, {"name": "light pink", "hex": "#EFC4E0"}, {"name": "maroon", "hex": "#4B1426"}, {"name": "military green", "hex": "#48553C"}, {"name": "mint green", "hex": "#B3CAB0"}, {"name": "navy", "hex": "#323A4E"}, {"name": "old gold", "hex": "#BA9657"}, {"name": "orange", "hex": "#E24D2B"}, {"name": "orchid", "hex": "#C8B9D2"}, {"name": "purple", "hex": "#34225A"}, {"name": "red", "hex": "#B12A2E"}, {"name": "royal", "hex": "#1B519A"}, {"name": "safety green", "hex": "#D2F721"}, {"name": "safety orange", "hex": "#F47F3B"}, {"name": "safety pink", "hex": "#F36CA4"}, {"name": "sand", "hex": "#B9B2A4"}, {"name": "sapphire", "hex": "#2D81A4"}, {"name": "sport grey", "hex": "#A09FA4"}, {"name": "violet", "hex": "#7673A1"}, {"name": "white", "hex": "#EEEEEE"},]),
      price: 15.99
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
