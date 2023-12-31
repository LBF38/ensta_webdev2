# Lab 3 - MicroFramework ExpressJS

## Exercice 1 - Hello World and random quotes

- Create the simple ExpressJS server app with "Hello World" message
![Simple app - Hello World](image.png)

- Add random quotes to the app

![random quotes](image-1.png)

## Exercice 2 - Things app

- Create a simple Express app with a router.
- POST /things route that will add a new thing (string) to the list of things.

![POST /things](image-2.png)

- GET /things route that will return the list of things.

![GET /things](image-3.png)

### Route Parameters

- GET /things/:id route that will return the thing with the given id.
=> with an error.
![GET /things/:id w/ error](image-4.png)
=> without an error.
![GET /things/:id](image-5.png)
=> use the thing element in the response
![GET /things/:id - use the thing element](image-6.png)

### Pattern Match Routes

- GET /things/* route will display an error message.

![GET /things/* - example w/ /things/param/others](image-7.png)

- GET /things/:id([0-9]{5}) route is before the GET /things/:id and display the given id.

![GET /things/:id([0-9]){5}](image-8.png)

### Middleware

- GET the things routes while adding middlewares. We can see that the middlewares are called before the route.

![GET /things routes w/ middleware](image-9.png)

- GET / display the message from the middleware response.

![GET / - display middleware response](image-10.png)

The logging middleware is called in every request.
