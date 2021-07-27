let router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).json("hello logged in owner")
})

module.exports = router;