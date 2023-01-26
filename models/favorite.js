// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const favoriteSchema = new Schema(
	{
		title: { type: String, required: true },
		genre: { type: String, required: true },
        director: { type: String, required: true },
		date: { type: Number, required: true },
		description: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Favorite = model('Favorite', favoriteSchema)


// Export our Model
module.exports = Favorite