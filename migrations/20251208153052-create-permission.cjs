"use strict";

module.exports ={
   async  up(queryInterface, Sequelize) {
  await queryInterface.createTable("Permissions", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    module: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
},
 async down(queryInterface) {
  await queryInterface.dropTable("Permissions");
}
}