const crypto = require('crypto');

function generateHash(size) {
  return crypto.randomBytes(size).toString('HEX');
}

module.exports = generateHash;
