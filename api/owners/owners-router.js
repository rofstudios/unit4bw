let router = require('express').Router();
let Owner = require('./owners-module');

// GETS owner information + adds listings total
router.get('/', (req, res, next) => {
    let ownerId = req.jwt.subject;
    Owner.getOwner(ownerId)
        .then(owner => {
            res.status(200).json(owner);
        })
        .catch(next)

})
// GETS all item listings of logged owner
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
            if (!listing) {
                res.status(404).json({ message: `no item found with id: ${id}` })
            } else {
                listing.listing_price = Number(listing.listing_price)
                res.status(200).json(listing);
            }
        })
        .catch(next)
})

router.put('/listing/:id', (req, res, next) => {
    let id = req.params.id;
    let changes = req.body;
    if (changes.listing_category || changes.listing_name || changes.listing_description || changes.listing_location || changes.listing_price) {
        Owner.update(id, changes)
            .then(changed => {
                console.log(changed, 'changed')
                if (!changed) {
                    res.status(400).json({ message: `no listing to update found under id: ${id}` })
                } else {
                    res.status(200).json(changed)
                }
            })
            .catch(next)
    } else {
        res.status(400).json({ message: 'requires at least one property to be updated' })
    }

})

router.delete('/listing/:id', (req, res, next) => {
    let { id } = req.params;

    Owner.remove(id)
        .then(returned => {
            console.log(returned, "returned logged")
            if (returned == null) {
                res.status(400).json({ message: `no listing to delete found under id: ${id}` })
            } else {
                if (returned > 0) {
                    res.status(200).json({ message: `successfully removed listing under id: ${id}` })
                } else {
                    next();
                }
            }
        })
})

module.exports = router;