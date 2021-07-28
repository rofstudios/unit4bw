let router = require('express').Router();
let Users = require('../owners/owners-module');

router.get('/', (req, res, next) => {
    Users.getListings()
        .then(listings => {
            if (listings) {
                res.status(200).json(listings)
            } else {
                res.status(404).json({ message: 'no listings found' })
            }
        })
        .catch(next)
})

module.exports = router;