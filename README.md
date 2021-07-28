# African Marketplace API
## API - https://african-marketplace-bw4.herokuapp.com
# ENDPOINTS-status - wip

## Database SCHEMA(s)
### Owners
Name | Data Type | Metadata
-------- | -------- | --------
owner_id | integer | PK, auto increment & auto generates
email | string | required, unique
password | string | required
location | string | not required/null
profile_url | string | not required/null

### products - wip
### listings
Name | Data Type | Metadata
--------------- | ----------- | ----------
listing_id| | integer | PK, auto incremet/generates
owner_id | integer | required, FK
listing_category | string | required
listing_name | string | required
listing_description | string | not required
listing_location | string | required
listing_price | integer | required

### ** When accessing /api/owner it will require req.header to carry Auth Token **

## REGISTER
> - .POST to /api/auth/register
>   * 201 status code - successful registration
>   * 500 status code - failed to create new registration

Requirements:
```js
{
  email: string,
  password: string,
  location: string,
  profile_url: string
}
```
Response:
```js
{
    message: string,
    owner: {
        owner_id: num,
        email: string,
        location: string
    }
}
```

## LOGIN
> - .POST to /api/auth/login
>   * 200 status code - on successful login
>   * 401 status code - invalid credentials

Requirements:
```js
{
  email: string,
  password: string
}
```
Response:
```js
{
  message: string,
  token: string
}
```

## GET request to api/owners - should only be accessible after logging in (token in header)
> - .GET to /api/owners
>   * Owner info
>   * 200 status code - successful request
>   * 401 status code - unauthorized access/login required

Response: 
```js
{
    owner_id: num,
    email: string,
    location: string || null,
    profile_url: string || null,
    items: num
}
```

## POST new item listing
> - .POST to /api/owners/listing
>   * 200 status code - successful request 

Require:
```js
{
  listing_category: string,
  listing_name: string,
  listing_description: string,
  listing_location: string,
  listing_price: num
}
```
Response:
```js
{
    listing_id: num,
    owner_id: num,
    listing_category: string,
    listing_name: string,
    listing_description: string,
    listing_price: num,
    listing_location: string
}
```

## GET all listings linked to logged in OWNER
>- GET to /api/owners/listing
>   * Returns and array of objects
>   * 200 status code - request successful
>   * 404 status code - message: "no listings found"

Response:
```js
  [
    {
        listing_id: 1,
        listing_category: fruit,
        listing_name: string,
        listing_price: num,
        listing_location: string,
        owner_id: num,
        email: string
    }
]
```

## GET all an array of available listings for USERS
>- GET to /api/users
>   * 200 status code - successful request
>   * 404 status code - message: "no listings found"

Response:
```js
[
    {
        listing_id: num,
        owner_id: num,
        listing_category: string,
        listing_name: string,
        listing_description: string,
        listing_location: string,
        listing_price: num
    }
]
```

## GET individual listings by id, only accessible to owners
>- GET /api/owners/listings/:id

Response:
```js
{
    listing_id: num,
    owner_id: num,
    listing_category: string,
    listing_name: string,
    listing_description: string,
    listing_location: string,
    listing_price: num
}
```

## PUT update a single listing dynamically, only accessible to owners || :id is replaced by the id of the listing to be updated
> - GET /api/owners/listing/:id
>   * Requires any of the following properties in order to update.
>   * Responds with the entire object of the listing
>   * 200 status code - successfully updated, returns object of the updated listing
>   * 400 status code - missing information in body to update || listing does not exist

Require:
```js
{
    listing_category: string,
    listing_name: string,
    listing_description: string,
    listing_location: string,
    listing_price: num
}
```
Response:
```js
{
  listing_id: num,
  owner_id: num,
  listing_category: string,
  listing_name: string,
  listing_description: string,
  listing_location: string,
  listing_price: num
}
```

## DELETE removes a single listing dynamically, only accessible to owners || :id is replaced by the id of the listing to be deleted
> - DELETE /api/owners/listing/:id
>   * 200 status code - successfully removed, returns a message
>   * 400 status code - listing does not exist in the database

Response: 200 OK
```js
{ 
  message: `successfully removed listing under id: ${id}`
}
```
