const bcrypt = require('bcrypt');


export const hash = async (password) => bcrypt.hash(password, 10);

export const verify = async (password, hashedPassword) => bcrypt
  .compare(password, hashedPassword);
