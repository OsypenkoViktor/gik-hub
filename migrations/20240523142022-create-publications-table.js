'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Publications', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId:{
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title:{
        allowNull:false,
        type:Sequelize.TEXT,
        validate:{
          len:[10,50]
        }
      },
      text:{
        allowNull:false,
        type:Sequelize.TEXT,
      },
      isModerated:{
        allowNull:false,
        defaultValue:false,
        type:Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
