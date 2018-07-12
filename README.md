## HTTP is stateless

* The server is not keeping track of who you are. It won't remember you.
* Every single request we make, must include all the data that the server needs. 

```
GET /urls HTTP/1.1
Host: tinyapp.com
Accept: */*
User-Agent: sams-demo-code
```

```
HTTP/1.1 401 Unauthorized
...
```

* Add a header

```
GET /urls HTTP/1.1
Host: tinyapp.com
Accept: */*
User-Agent: sams-demo-code
X-random-user-value:  98f1e38c-4115-4277-af9f-f0a3b2660d9f
```

managing custom headers becomes a little difficult

* url query parameters

tinyapp.com/urls?username=yourname

```
GET /urls?username=yourname HTTP/1.1
Host: tinyapp.com
Accept: */*
User-Agent: sams-demo-code
```

urls become un-shareable

## Cookies

* Little bit of data, that can associated with anything, maybe a name.
* server creates the cookie.
* Sent to the client from the server
* Stored in the browser.
* The browser will then send the cookie back to the server with every request. As long as the cookie lives.

```
POST /login HTTP/1.1
host: tinyapp.com
...
```

```
HTTP/1.1 200 OK
Set-Cookie: username=yourname; language=en
...
```

```
GET /urls HTTP/1.1
host: tinyapp.com
Cookie: username=yourname; language=en
```

likes=pizza

## Storing Passwords

* encryption: A function that takes in some input and returns some random looking output
ukulele -> b2c860e0-ed95-4789-8f8f-05beffc527a9
b2c860e0-ed95-4789-8f8f-05beffc527a9 -> ukulele
* hashing:
ukulele -> 2c200601-1347-4693-aba1-f91882b062c6
2c200601-1347-4693-aba1-f91882b062c6 ->X ukulele
* salt:
An extra random peice of data attached to the value that we're hashing, to make the hash different.

hashing is one way, encryption is two way. you can decrypt.

* usually we want hashing algorithms to be quick.
* A time when  we will want a hashing algorithm to be slow is... when hashing passwords.