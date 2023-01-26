// Import Dependencies
const express = require('express')
const Favorite = require('../models/favorite')

// Create router
const router = express.Router()

// GET route
router.get('/', (req, res) => {
    Favorite.find({ owner: req.session.userId })
		.populate('owner', 'username')
		.then(movies => {
			// res.status(200).json({ movies: movies })
			res.render('movies/index', { movies, ...req.session })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// POST route
router.post('movie/:id/favorite', async (req, res) => {
    const id = req.params.id
	Movie.findById(id)
		.populate('favorites.owner', 'username')
        .populate('comments.commentator', 'username')
		.then(movie => {
			// res.json({ movie: movie })
			res.render('favorites/show.liquid', {movie, ...req.session})
		})
		.catch((error) => {
			// console.log(err)
            // res.status(404).json(err)
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router