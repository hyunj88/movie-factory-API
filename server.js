////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const MovieRouter = require('./controllers/movieControllers')
const CommentRouter = require('./controllers/commentControllers')
const FavoriteRouter = require('./controllers/favoriteControllers')
const UserRouter = require('./controllers/userControllers')
const User = require("./models/user")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/movies', MovieRouter)
app.use('/comments', CommentRouter)
app.use('/favorites', FavoriteRouter)
app.use('/auth', UserRouter)

app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})

//////////////////////////////
//      App Listener        //
//////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))