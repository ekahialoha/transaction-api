'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registry = sequelize.define('Registry', {
    name: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {});
  Registry.associate = models => {
    models.Registry.belongsTo(models.Account, {
      foreignKey: 'accountId'
    });
    models.Registry.hasMany(models.Transaction, {
      foreignKey: 'registryId'
    });
  };
  return Registry;
};
