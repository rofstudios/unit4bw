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
### listings - wip

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
    message: "Welcome legacy2@gmail.com",
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
>   * Simple proof that /owners was accessible with valid token
>   * 200 status code - successful request
>   * 401 status code - unauthorized access/login required

Response: 
```js
"hello {email}"
// this is just used atm, to verify that you can access a restricted endpoint using the correct token
```