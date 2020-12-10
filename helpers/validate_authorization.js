const validateAuthorization = (user, target = null) => (user !== undefined && (user.isAdmin || (target !== null && user.id === target)));

module.exports = validateAuthorization;
