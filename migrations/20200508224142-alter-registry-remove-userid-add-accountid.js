
module.exports = {
  up: async (queryInterface, Sequelize) => [
    await queryInterface.removeColumn('Registries', 'userId'),
    await queryInterface.addColumn('Registries', 'accountId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Accounts',
          key: 'id',
        },
      },
    }),
  ],

  down: async (queryInterface, Sequelize) => [
    await queryInterface.addColumn('Registries', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Users',
          key: 'id',
        },
      },
    }),
    await queryInterface.removeColumn('Registries', 'accountId'),
  ],
};
