
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Account.associate = (models) => {
    models.Account.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    models.Account.hasMany(models.Registry, {
      foreignKey: 'accountId',
    });
  };
  return Account;
};
