// import dependencies
const mongoose = require('../utils/connection')
const Movie = require('./movie')

// Seed Script code
const db = mongoose.connection

db.on('open', () => {
    const startMovies = [
        { title: 'Django Unchained', genre: 'Western', 
        director: 'Quentin Tarantino', date: 2012,
        cast: 'Jamie Fox, Christoph Waltz, Leonardo DiCaprio...',
        description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.' },
        { title: 'The Prestige', genre: 'Thriller', 
        director: 'Christopher Nolan', date: 2006,
        cast: 'Jamie Fox, Christoph Waltz, Leonardo DiCaprio...',
        description: 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.' },
        { title: 'Her', genre: 'Drama/Romance/Sci-Fi', 
        director: 'Spike Jonze', date: 2013,
        cast: 'Jamie Fox, Christoph Waltz, Leonardo DiCaprio...',
        description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.' },
        { title: 'Blade Runner', genre: 'Sci-Fi', 
        director: 'Ridley Scott', date: 1982,
        cast: 'Jamie Fox, Christoph Waltz, Leonardo DiCaprio...',
        description: 'A blade runner, a cop who specilaizes in terminating humanoid androids must pursue and terminate four replicants(humanoids) who stole a ship in space and have returned to Earth to find their creator.' },
        { title: 'Taxi Driver', genre: 'Psychological thriller', 
        director: 'Martin Scorsese', date: 1976,
        cast: 'Jamie Fox, Christoph Waltz, Leonardo DiCaprio...',
        description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.' },
        { title: 'About Time', genre: 'Romance/Comedy', 
        director: 'Richard Curtis', date: 2013,
        cast: 'Jamie Fox, Christoph Waltz, Leonardo DiCaprio...',
        description: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.' }
    ]
    
    Movie.deleteMany({})
        .then(() => {
            Movie.create(startMovies)
                .then(data => {
                    console.log('created movies: \n', data)
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})