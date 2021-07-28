let router = require('express').Router();
let Owner = require('./owners-module');

// GETS owner information + adds listings total
router.get('/', (req, res, next) => {
    console.log('hello')
    let ownerId = req.jwt.subject;
    console.log(ownerId, 'ownerid')
    Owner.getOwner(ownerId)
        .then(owner => {
            console.log(owner, 'ownerrrrr')
            res.status(200).json(owner);
        })
        .catch(next)

})
// GETS all item listings
router.get('/listing', (req, res, next) => {
    let ownerId = req.jwt.subject;

    Owner.getAllOwnerItems(ownerId)
        .then(items => {
            if (items == null) {
                res.status(404).json({ message: 'no listings found' })
            } else {
                res.status(200).json(items)
            }
        })
        .catch(next)

})

// POSTS adds a new item listing
router.post('/listing', (req, res, next) => {
    let ownerId = req.jwt.subject;
    let listing = { ...req.body, owner_id: ownerId };

    Owner.addListing(listing)
        .then(([addedListing]) => {
            addedListing.listing_price = Number(addedListing.listing_price)
            res.status(201).json(addedListing)
        })
        .catch(next)

})

// GETS listing by id
router.get('/listing/:id', (req, res, next) => {
    let { id } = req.params;
    Owner.getItemById(id)
        .then(listing => {
            listing.listing_price = Number(listing.listing_price)
            if (listing) {
                res.status(200).json(listing);
            } else {
                res.status(404).json({ message: `no item found with id: ${id}` })
            }
        })
        .catch(next)
})


module.exports = router;