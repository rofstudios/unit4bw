let express = require('express');
let router = express.Router();

let bcryptjs = require('bcryptjs');
let tokenBuilder = require('./tokenbuilder');
let Owners = require('../owners/owners-module');


router.post('/register', (req, res, next) => {
    let credentials = req.body;
    let rounds = process.env.BCRYPT_ROUNDS || 8;
    let hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;
    Owners.register(credentials)
        .then(([owner]) => {
            res.status(201).json({ message: `Welcome ${owner.email}`, owner })
        })
        .catch(next);

})

router.post('/login', (req, res, next) => {
    let creds = req.body;
    Owners.login({ email: creds.email })
        .then(user => {
            if (user && bcryptjs.compareSync(creds.password, user.password)) {
                let token = tokenBuilder(user);
                res.status(200).json({
                    message: `Welcome back ${user.email}`,
                    token,
                })
            } else {
                next({ status: 401, message: "invalid credentials" })
            }
        })
        .catch(next)

})

module.exports = router;