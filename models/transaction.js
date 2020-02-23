'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {});
  Transaction.associate = models => {
    models.Transaction.hasOne(models.User, {
      foreignKey: 'userId'
    });
    models.Transaction.belongsTo(models.Registry, {
      foreignKey: 'registryId'
    });
  };
  return Transaction;
};
