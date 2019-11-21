
const jwt = require('jsonwebtoken');
const config = require('../config')();


const issueToken = (payload) => {
  const token = jwt.sign({
    data: payload,
  }, config.SECRET, { expiresIn: 60 * 60 * 12 });
  return token;
};

module.exports = issueToken;
