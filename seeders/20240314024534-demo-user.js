'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Tasks', [{
      user_id:1,
      title: 'Task a',
      description: '',
      due_date: new Date(),
      priority_id: 1,
      status_id:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id:1,
      title: 'Task b',
      description: '',
      due_date: new Date(),
      priority_id: 1,
      status_id:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
