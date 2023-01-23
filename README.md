# Project2-API

## Overview

Movie Factory is an online database of information related to movies. It includes the type of genre, film director and movie synaopsis. It's great place for fans and film enthusiasts to visit and share your opinion. You can even have a friendly debate or discussion on the movies you like and don't like. Come and leave a review on your favorite film!

## Technologies Used

  - Javascript
  - Mongodb
  - Mongoose
  - HTML
  - CSS
  - Express, Liquid, Bootstrap

## User Stories

  - As a user, I want the ability to sign up.
  - As a user, I want the ability to sign in. 
  - As a user, I want the ability to make a password. 
  - As a user, I want the ability to sign out. 
  - As a user, I want the ability to add in my own movies. 
  - As a user, I want the ability to udpate my movies. 
  - As a user, I want the ability to view all of movies in a list. 
  - As a user, I want the ability to read more details of individual movies.
  - As a user, I want the ability to add a review/comment for a movie.
  - As a user, I want the ability to delete my review/comment for a movie.
  - As a user, I want the ability to delete my own movies. 
  - As a user, I want the ability to view movies others have added. 
  - As a user, I want the ability to favorite movies that other people have added. 
  - As a user, I want the ability to view all of the movies I have favorited. 
  - As a user, I want the ability to remove movies from my favorites.
  
## Route tables for documents

## Movies
| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /moviess/        | GET          | index  
| /movies/:id      | GET          | show       
| /movies/new      | GET          | new   
| /movies          | POST         | create   
| /movies/:id/edit | GET          | edit       
| /movies/:id      | PATCH/PUT    | update    
| /movies/:id      | DELETE       | destroy 


## Users
| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /users/signup    | GET          | new  
| /users/signup    | POST         | create  
| /users/login     | GET          | login 
| /users/login     | POST         | create      
| /users/logout    | DELETE       | destroy   


## Comments
| **URL**                                   | **HTTP Verb**  |**Action**|
|-------------------------------------------|----------------|----------|
| /comments/:movieId                        | POST           | create  
| /comments/delete/:movieId/:commentId      | DELETE         | destroy     

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/auth/signup`             | `users#signup`    |
| POST   | `/auth/login`             | `users#login`    |
| DELETE | `/auth/logout/`        | `users#logout`   |

### Error Handling

Errors are handled with a default view, and should be called as seen in this example:
```js
router.delete('/:id', (req, res) => {
    const exampleId = req.params.id
    Example.findByIdAndRemove(exampleId)
        .then(example => {
            res.redirect('/examples')
        })
        .catch(error => {
            res.redirect(`/error?error=${error}`)
        })
})
```

  ## WireFrames / ScreenShots

![Wireframe 1](https://user-images.githubusercontent.com/112126759/213948838-5b72313c-06fa-45bb-b596-9cfeef99fb2d.png)

![Wireframe 2](https://user-images.githubusercontent.com/112126759/213948857-b6599938-6a33-43c7-bc68-74ec1d593f6d.png)


  ## Entity Relationship Diagrams (ERDs)

![ERD](https://user-images.githubusercontent.com/112126759/213948868-e5e4cafe-7fae-4784-bc6a-22e114241514.png)
