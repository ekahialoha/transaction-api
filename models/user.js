'use strict';
const bcrypt = require('bcrypt');

const validatePassword = require('../helpers/validate_password');
const hashPassword = require('../helpers/hash_password');

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
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });

  User.associate = models => {
    models.User.hasMany(models.Registry, {
      foreignKey: 'userId'
    });
  };

  User.prototype.validatePassword = function(password) {
    return validatePassword(password, this.password);
  };

  User.prototype.toJSON = function() {
    const user = Object.assign({}, this.get());
    delete user.password;
    return user;
  };

  return User;
};
