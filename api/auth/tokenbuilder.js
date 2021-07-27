const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets');

module.exports = function (user) {
    const payload = {
        subject: user.owner_id,
        email: user.email,
        location: user.location,
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, jwtSecret, options)
}
