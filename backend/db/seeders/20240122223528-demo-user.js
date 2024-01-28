'use strict';
const bcrypt = require("bcryptjs")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Users';
   return queryInterface.bulkInsert(options, [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@email.com",
      hashedPassword: bcrypt.hashSync('password123')
    },
    {
      id: 2,
      firstName: 'Demo',
      lastName: 'Lition',
      email: 'demo@user.io',
      admin: true,
      hashedPassword: bcrypt.hashSync('password234')
    },
    {
      id: 3,
      firstName: 'Fake',
      lastName: 'User3',
      email: 'user3@user.io',
      hashedPassword: bcrypt.hashSync('password345')
    },
    {
      id: 4,
      firstName: 'Fake',
      lastName: 'User4',
      email: 'user4@user.io',
      hashedPassword: bcrypt.hashSync('password456')
    },
    {
      id: 5,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      hashedPassword: bcrypt.hashSync('secret password789')
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: ['johndoe@email.com', 'demo@user.io', 'user3@user.io', 'user4@user.io', 'john.smith@gmail.com']
      }
    }, {});
  }
};
