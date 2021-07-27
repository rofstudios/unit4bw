let db = require('../data/db-config');

function register(owner) {
    return db('owners').insert(owner, ['owner_id', 'email', 'location'])
}

async function login(filter) {
    let owner = await db('owners as o').select('o.owner_id', 'o.email', 'o.password').where(filter).first();
    return owner;
}

module.exports = {
    register,
    login
}