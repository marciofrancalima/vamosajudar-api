const crypto = require('crypto');

function generateHash(size = 4) {
  if (size === 0) {
    size = 4;
  }

  return crypto.randomBytes(size).toString('HEX');
}

module.exports = generateHash;
