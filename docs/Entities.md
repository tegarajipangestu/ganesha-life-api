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
``` 	{“username”:”nickname”,“password”:”password”}
```
### Log Out

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