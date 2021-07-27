exports.up = async (knex) => {
  await knex.schema
    .createTable('owners', (tbl) => {
      tbl.increments('owner_id');
      tbl.string('email', 200).notNullable().unique();
      tbl.string('password', 200).notNullable();
      tbl.string('location', 200).nullable();
      tbl.string('profile_url', 255).nullable().unique();
    })
    .createTable('products', (tbl) => {
      tbl.increments('product_id')
      tbl.string('product_category', 128)
      tbl.string('product_name', 200).unique().notNullable()
    })

    .createTable('listings', (tbl) => {
      tbl.increments('listing_id')
      tbl
        .integer('owner_id')
        .unsigned()
        .references('owners.owner_id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      tbl.string('listing_category', 128).notNullable()
      tbl.string('listing_name', 200).notNullable();
      tbl.string('listing_description', 255).nullable();
      tbl.string('listing_location', 128).notNullable();
      tbl.decimal('listing_price', 12, 4).notNullable();
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('listings')
    .dropTableIfExists('products')
    .dropTableIfExists('owners');
}
