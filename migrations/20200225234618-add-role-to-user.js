
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'role', {
    type: Sequelize.INTEGER,
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'role'),
};
