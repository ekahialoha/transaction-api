const bcrypt = require('bcrypt');

const hashPassword = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (e) {
    console.log(e);
  }
};

module.exports = hashPassword;
