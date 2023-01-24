// import dependencies
const mongoose = require('./connection')
const Movie = require('./movie')

// Seed Script code
const db = mongoose.connection

db.on('open', () => {
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