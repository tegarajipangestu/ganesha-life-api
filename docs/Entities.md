#API

##Example
```
{
    "error": false,
    "alerts": {
        "code": "200",
        "message": "retrieve success"
    },
    "data": object, array
}
```
2xx : success
4xx : client error (error pasti dari sisi klien, karena kurang parameter, format parameter yang salah, etc)
5xx : server error

## Authentication
### Log In
URL
```
http://<base_url>/mobileglapi/login
```
body
``` 	
{“username”:”nickname”,“password”:”password”}
```
response
```
{
    "error": false,
    "alerts": {
        "code": "200",
        "message": "login success"
    },
    "data": {
        "user_id": 29,
        "username": "Yanfa Adi Putra",
        "email": "blabla@gmail.com",
        "role": 1,
        "token": "8f5f8683897f42aaa89163ba3d91951d"
    }
}
```
### Log Out (POST)
Endpoint
```
http://<base_url>/mobileglapi/logout
```
### ChangeA Password
### Forgot Password
### Sign Up
## Read Now
### Get list post per category
### Set bookmark
### Set rating
### Search In All Post
## My Library
### Get My Library Data
### Search In My Library
## My Bookmark
### Get My Bookmark Post
### Search In My Bookmark
## Explore
### Get Available List in Kategori or Topics
## General
### Set as followed or unfollowed
###Get Post From Specific Publisher
###Get Publisher Detail