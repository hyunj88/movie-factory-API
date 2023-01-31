// import dependencies
const mongoose = require('../utils/connection')

// import user model for populate
const User = require('./user')
const Movie = require('./movie')
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const favoriteSchema = new Schema({
		movie: { 
            type: Schema.Types.ObjectID,
            ref: 'Movie'
        },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User'
	    },
        comments: [commentSchema]
})

const Favorite = model('Favorite', favoriteSchema)


// Export our Model
module.exports = Favorite