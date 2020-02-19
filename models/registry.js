'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registry = sequelize.define('Registry', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {});
  Registry.associate = models => {
    Registry.belongsTo(models.User, {
      foreignKey: 'id'
    });
  };
  return Registry;
};
