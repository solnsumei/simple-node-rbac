const bcrypt = require('bcrypt');


const hash = async (password) => bcrypt.hash(password, 10);

const verify = async (password, hashedPassword) => bcrypt
  .compare(password, hashedPassword);

module.exports = { hash, verify };
