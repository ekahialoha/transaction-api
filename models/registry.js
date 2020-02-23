'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registry = sequelize.define('Registry', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {});
  Registry.associate = models => {
    models.Registry.belongsTo(models.User, {
      foreignKey: 'id'
    });
  };
  return Registry;
};