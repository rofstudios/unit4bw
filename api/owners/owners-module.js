let db = require('../data/db-config');

// ================================= OWNERS ===================================

function register(owner) {
    return db('owners').insert(owner, ['owner_id', 'email', 'location'])
}

async function login(filter) {
    let owner = await db('owners as o').select('o.owner_id', 'o.email', 'o.password').where(filter).first();
    return owner;
}

async function getAllOwnerItems(ownerId) { // added
    let allItems = await db('owners as o').join('listings as l', 'l.owner_id', 'o.owner_id')
        .select('l.listing_id', 'l.listing_category', 'l.listing_name', 'l.listing_price', 'l.listing_location', 'o.owner_id', 'o.email')
        .where('o.owner_id', ownerId)
        .orderBy('l.listing_category', 'desc');

    if (allItems.length == 0) {
        return null
    } else {
        return allItems.map(items => (
            {
                ...items,
                listing_price: Number(items.listing_price)
            }
        ))
    }
    // return allItems;
}

function addListing(listing) {
    return db('listings').insert(listing, ['listing_id', 'owner_id', 'listing_category', 'listing_name', 'listing_description', 'listing_price', 'listing_location'])
}

async function getOwner(ownerId) { // gets owner info and adds a count of all items that owner has added
    let ownerInfo = await db('owners').select('owner_id', 'email', 'location', 'profile_url').where('owner_id', ownerId).first();
    let [ownerItemCount] = await db('listings').countDistinct('listing_name').where('owner_id', ownerId);

    return {
        ...ownerInfo,
        items: Number(ownerItemCount.count),
    }
}

function getItemById(id) {
    return db('listings').select('*').where('listing_id', id).first();
}


// ================================= USERS ===================================
async function getListings() {
    let listings = await db('listings')
    if (listings.length == 0) {
        return null
    } else {
        return listings.map(listing => (
            {
                ...listing,
                listing_price: Number(listing.listing_price)
            }
        ))
    }

}

module.exports = {
    // owners-model
    register,
    login,
    getAllOwnerItems,
    addListing,
    getOwner,
    getItemById,

    // users-model
    getListings,
}