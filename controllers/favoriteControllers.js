// Import Dependencies
const express = require('express')
const Favorite = require('../models/favorite')

// Create router
const router = express.Router()

// GET - favorite movie index
router.get('/', (req,res)=> {
    Favorite.find({ owner: req.session.userId })
    .populate('owner', 'username')
    .populate('movie', 'movieId')
        .then(favorite => {
            res.render('movies/favorite.liquid', { favorite, ...req.session })
        })
        .catch(err=> console.log(err))
})

// POST
router.post('/', (req, res) => {
	req.body.owner = req.session.userId
    const movieId = req.params.id
	Favorite.create({ movie: movieId, owner: req.session.userId })
    .populate('owner', 'username')
    .populate('movie', 'movieId')
		.then(() => {
			res.redirect('/favorites')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router