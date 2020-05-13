
const bcrypt = require('bcrypt');

const validatePassword = require('../helpers/validate_password');
const hashPassword = require('../helpers/hash_password');

const rolesENUM = [
  'User',
  'Admin',
];

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validates: { len: [4, 150] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validates: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('role') === 0;
      },
      set() {
        throw new ('Unable to set isUser directly')();
      },
    },
    isAdmin: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('role') === 1;
      },
      set() {
        throw new ('Unable to set isAdmin directly')();
      },
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  });

  User.associate = (models) => {
    models.User.hasMany(models.Account, {
      foreignKey: 'userId',
    });
  };

  User.prototype.validatePassword = function (password) {
    return validatePassword(password, this.password);
  };

  User.prototype.toJSON = function () {
    const user = { ...this.get() };
    delete user.password;
    return user;
  };

  // User.prototype.

  return User;
};
