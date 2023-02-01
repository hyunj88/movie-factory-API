// Import Dependencies
const express = require('express')
const Favorite = require('../models/favorite')
const Movie = require('../models/movie')

// Create router
const router = express.Router()

// GET
router.get('/', (req,res)=> {
    Favorite.find({ owner: req.session.userId })
    .populate('owner', 'username')
    .populate('movie', 'movieId')
        .then(favorite => {
            res.render('favorites/index.liquid', { favorite, ...req.session })
        })
        .catch(err=> console.log(err))
})

// POST - favorited movies
router.post('/:movieID', (req, res) => {
    req.body.owner = req.session.userId
    const movieID = req.params.movieID
    req.body.favorite = req.body.favorite === 'on' ? true : false
    if (req.session.loggedin)
        Favorite.create({ movie: movieID, owner: req.session.userId })
            .then(movie => {
                res.redirect('/favorites')
            })
            .catch(error => {
                res.redirect(`/error?error=${error}`)
            })
})



// router.post('/', (req, res) => {
//     const { username, loggedin, userId } = req.session
//     req.body.owner = req.session.userId
//     console.log('this is the username, loggedin, userId', req.session)
//     if (req.session.loggedin) {
//         const favMovie = {
//             movieId: req.body.movieId,
//             owner: req.session.userId,
//             genre: req.body.genre,
//             director: req.body.director,
//             date: req.body.date,
//             cast: req.body.cast,
//             description: req.body.description
//         }
//         Favorite.create(favMovie)
//         .then(({}) => {
//             res.redirect('movies')
//         })
//         .catch(err => {
//             console.log('This is the following error: ', err)
//         })
//     }
// })



// Export the Router
module.exports = router