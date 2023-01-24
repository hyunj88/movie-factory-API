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


// Export the Router
module.exports = router
