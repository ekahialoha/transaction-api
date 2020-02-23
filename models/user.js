'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validates: { len: [4, 150] }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validates: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  User.associate = models => {
    models.User.hasMany(models.Registry, {
      foreignKey: 'userId'
    });
  };
  return User;
};
