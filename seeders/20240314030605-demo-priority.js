"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Priorities", [
            {
                name: "Low",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Medium",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "High",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
