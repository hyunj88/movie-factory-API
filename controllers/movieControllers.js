// Import Dependencies
const express = require('express')
const Movie = require('../models/movie')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })

// Routes
router.get('/seed', (req, res) => {
    // array of starter resources(movies)
    const startMovies = [
        { title: 'Django Unchained', genre: 'Western', 
        director: 'Quentin Tarantino', date: 2012,
        description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.', 
        favorite: false },
        { title: 'The Prestige', genre: 'Thriller', 
        director: 'Christopher Nolan', date: 2006,
        description: 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.', 
        favorite: true },
        { title: 'Her', genre: 'Drama/Romance/Sci-Fi', 
        director: 'Spike Jonze', date: 2013,
        description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.', 
        favorite: false },
        { title: 'Blade Runner', genre: 'Sci-Fi', 
        director: 'Ridley Scott', date: 1982,
        description: 'A blade runner, a cop who specilaizes in terminating humanoid androids must pursue and terminate four replicants(humanoids) who stole a ship in space and have returned to Earth to find their creator.', 
        favorite: true },
        { title: 'Taxi Driver', genre: 'Psychological thriller', 
        director: 'Martin Scorsese', date: 1976,
        description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.', 
        favorite: true },
        { title: 'About Time', genre: 'Romance/Comedy', 
        director: 'Richard Curtis', date: 2013,
        description: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.', 
        favorite: true }
    ]
    Movie.deleteMany({})
        .then(() => {
            Movie.create(startMovies)
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log('The following error occurred: \n', err))
        })
})

// INDEX route 
// Read -> finds and displays all fruits
router.get('/', (req, res) => {
    // find all the fruits
    Movie.find({})
        // send json if successful
        .then(movies => { res.json({ movies: movies })})
        // catch errors if they occur
        .catch(err => console.log('The following error occurred: \n', err))
})

// index that shows only the user's movies
router.get('/mine', (req, res) => {
    // find cars by ownership, using the req.session info
    Movie.find({ owner: req.session.userId })
		.then(movies => {
			res.render('movies/index', { movies, ...req.session })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	res.render('movies/new', { ...req.session })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.owner = req.session.userId
	req.body.favorite = req.body.favorite === 'on' ? true : false
	Movie.create(req.body)
		.then(movie => {
			res.redirect(`/movies/${movie.id}`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/edit/:id', (req, res) => {
	// we need to get the id
	const movieId = req.params.id
	Movie.findById(movieId)
		.then(movie => {
			res.render('movies/edit', { movie, ...req.session })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const movieId = req.params.id
	req.body.favorite = req.body.favorite === 'on' ? true : false
	Movie.findById(id)
    .then(movie => {
        if (movie.owner == req.session.userId) {
            // update and save the movie
            return movie.updateOne(req.body)
        } else {
            res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20movie`)
        }
    })
    .then(() => {
        res.redirect(`/movie/mine`)
    })
    .catch(err => {
        res.redirect(`/error?error=${err}`)
    })
})

// show route
router.get('/:id', (req, res) => {
	const id = req.params.id
	Movie.findById(id)
		.then(movie => {
			res.render('movies/show.liquid', {movie, ...req.session})
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const movieId = req.params.id
	Movie.findByIdAndRemove(movieId)
		.then(movie => {
			if (movie.owner == req.session.userId) {
				return movie.deleteOne()
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20movie`)
			}
		})
		.then(() => {
			res.redirect('/movies/mine')
		})
			.catch(err => {
				console.log(err)
				res.redirect(`/error?error=${err}`)
			})
	})

// Export the Router
module.exports = router
