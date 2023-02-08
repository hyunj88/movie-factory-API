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
		cast: 'Jamie Fox, Christoph Waltz, Leonardo DiCaprio...',
        description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.' },
        { title: 'The Prestige', genre: 'Thriller', 
        director: 'Christopher Nolan', date: 2006,
		cast: 'Christian Bale, Hugh Jackman, Scarlett Johansson...',
        description: 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.' },
        { title: 'Her', genre: 'Drama / Romance / Sci-Fi', 
        director: 'Spike Jonze', date: 2013,
		cast: 'Joaquin Phoenix, Amy Adams, Scarlett Johansson...',
        description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.' },
        { title: 'Blade Runner', genre: 'Sci-Fi', 
        director: 'Ridley Scott', date: 1982,
		cast: 'Harrison Ford, Rutger Hauer, Sean Young...',
        description: 'A blade runner, a cop who specilaizes in terminating humanoid androids must pursue and terminate four replicants(humanoids) who stole a ship in space and have returned to Earth to find their creator.' },
        { title: 'Taxi Driver', genre: 'Psychological thriller', 
        director: 'Martin Scorsese', date: 1976,
		cast: 'Robert De Niro, Jodie Foster, Cybill Shepherd...',
        description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.' },
        { title: 'About Time', genre: 'Romance / Comedy', 
        director: 'Richard Curtis', date: 2013,
		cast: 'Domhnall Gleeson, Rachel McAdams, Bill Nighy...',
        description: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.' },
		{ title: 'Wedding Crashers', genre: 'Comedy', 
        director: 'David Dobkin', date: 2005,
		cast: 'Owen Wilson, Vince Vaughn, Rachel McAdams...',
        description: 'John Beckwith and Jeremy Grey, a pair of committed womanizers who sneak into weddings to take advantage of the romantic tinge in the air, find themselves at odds with one another when John meets and falls for Claire Cleary.' },
		{ title: 'No Country for Old Men', genre: 'Thriller / Drama', 
        director: 'Ethan Coen, Joel Coen', date: 2007,
		cast: 'Tommy Lee Jones, Javier Bardem, Josh Brolin...',
        description: 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.' },
		{ title: 'Looper', genre: 'Sci-Fi / Action', 
        director: 'Rian Johnson', date: 2012,
		cast: 'Joseph Gordon-Levitt, Bruce Willis, Emily Blunt...',
        description: 'In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe - who one day learns the mob wants to close the loop by sending back Joes future self for assassination.' },
		{ title: 'Rain Man', genre: 'Drama', 
        director: 'Barry Levinson', date: 1988,
		cast: 'Dustin Hoffman, Tom Cruise, Valeria Golino...',
        description: 'After a selfish L.A. yuppie learns his estranged father left a fortune to an autistic-savant brother in Ohio that he didnt know existed, he absconds with his brother and sets out across the country, hoping to gain a larger inheritance.' },
		{ title: 'Memento', genre: 'Thriller', 
        director: 'Christopher Nolan', date: 2000,
		cast: 'Guy Pearce, Carrie-Anne Moss, Joe Pantoliano...',
        description: 'Memento chronicles two separate stories of Leonard, an ex-insurance investigator who can no longer build new memories, as he attempts to find the murderer of his wife, which is the last thing he remembers. One story line moves forward in time while the other tells the story backwards revealing more each time.' },
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
// Read -> finds and displays all movies
router.get('/', (req, res) => {
	const { username, loggedIn, userId } = req.session
    Movie.find({})
		.populate('owner', 'username')
        .populate('comments.commentator', '-password')
        .then(movies => { 
			// res.json({ movies: movies })})
			res.render('movies/index', { movies, username, loggedIn, userId })
		})
		.catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

// index that shows only the user's movies
router.get('/mine', (req, res) => {
    Movie.find({ owner: req.session.userId })
		.populate('owner', 'username')
        .populate('comments.commentator', '-password')
		.then(movies => {
			// res.status(200).json({ movies: movies })
			res.render('movies/mine', { movies, ...req.session })
		})
		.catch(error => {
			// res.status(400).json(err)
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
	const id = req.params.id
	Movie.findById(id)
    .then(movie => {
        if (movie.owner == req.session.userId) {
			return movie.updateOne(req.body)
        } else {
			// res.sendStatus(401)
            res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20movie`)
        }
    })
    .then(() => {
        res.redirect(`/movies/mine`)
    })
    .catch(err => {
		// res.status(400).json(err)
        res.redirect(`/error?error=${err}`)
    })
})

// show route
router.get('/:id', (req, res) => {
	const id = req.params.id
	Movie.findById(id)
		.populate('comments.commentator', 'username')
		.then(movie => {
			// res.json({ movie: movie })
			res.render('movies/show.liquid', {movie, ...req.session})
		})
		.catch((error) => {
			// console.log(err)
            // res.status(404).json(err)
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
				// res.sendStatus(401)
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20movie`)
			}
		})
		.then(() => {
			res.redirect('/movies/mine')
		})
			.catch(err => {
				// console.log(err)
				// res.status(400).json(err)
				res.redirect(`/error?error=${err}`)
			})
	})

// Export the Router
module.exports = router
