let router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from users router" })
})

module.exports = router;