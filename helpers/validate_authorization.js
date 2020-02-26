const validateAuthorization = (user, target = null) => {
  return (user !== undefined && (user.isAdmin || (target !== null && user.id === target)));
};

module.exports = validateAuthorization;
