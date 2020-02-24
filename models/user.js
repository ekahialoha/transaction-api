'use strict';
const bcrypt = require('bcrypt');

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
      beforeCreate: async user => {
        try {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        } catch (e) {
          console.log(e);
        }
      }
    }
  });
  User.associate = models => {
    models.User.hasMany(models.Registry, {
      foreignKey: 'userId'
    });
  };
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
