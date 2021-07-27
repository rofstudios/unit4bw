let jwt = require('jsonwebtoken');
let { jwtSecret } = require('../../config/secrets');

module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token, "this is token from header")

    if (!token) {
        // clean up message by removing front end purposes
        return next({ status: 401, message: "login required // for frontend purposes: token is missing" })
    }
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            // clean up message by removing front end purposes
            return next({ status: 401, message: 'unauthorized // for frontend purposes: incorrect pasword/invalid token' })
        }
        req.jwt = decodedToken;
        next();
    })
}