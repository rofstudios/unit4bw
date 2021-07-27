let router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).json(`hello ${req.jwt.email}`)
})

module.exports = router;