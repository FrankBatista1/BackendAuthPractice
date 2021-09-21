const jwt = require('jsonwebtoken');

exports.generateJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const data = {uid: uid}// could be just uid
    jwt.sign(data, 'ajifddfjioadsoijff9802349y8qrhuio', {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        reject('Could not genearte token');
      } else {
        resolve(token);
      }
    })
  })
}

module.exports = {generateJwt}