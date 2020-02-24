'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    registryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        notNull: true
      }
    }
  }, {});
  Transaction.associate = models => {
    models.Transaction.hasOne(models.User, {
      foreignKey: 'id'
    });
    models.Transaction.belongsTo(models.Registry, {
      foreignKey: 'id'
    });
  };
  return Transaction;
};
