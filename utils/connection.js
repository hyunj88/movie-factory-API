// make our .env variables available via process.env
require('dotenv').config()
// import mongoose
const mongoose = require('mongoose')

// connect to the database

const DATABASE_URL = process.env.DATABASE_URL
// here is our DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DATABASE_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

// save the connection in a variable
const db = mongoose.connection

// create some notification
db.on('open', () => console.log('You are connected to mongo'))
db.on('close', () => console.log('You are disconnected from mongo'))
db.on('error', (error) => console.log(error))

// export the connection
module.exports = mongoose
