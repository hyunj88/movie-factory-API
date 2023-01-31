// import dependencies
const mongoose = require('../utils/connection')
const commentSchema = require('./comment')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const movieSchema = new Schema(
	{
		title: { type: String, required: true },
		genre: { type: String, required: true },
        director: { type: String, required: true },
		date: { type: Number, required: true },
		cast: { type: String, required: true },
		description: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema]
	},
	{ timestamps: true }
)

const Movie = model('Movie', movieSchema)


// Export our Model
module.exports = Movie
