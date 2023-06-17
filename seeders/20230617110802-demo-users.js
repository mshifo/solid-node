'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [];

    // Generate 100 user records
    for (let i = 0; i < 100; i++) {
      usersData.push({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
      });
    }

    await queryInterface.bulkInsert('users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
