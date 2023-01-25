// schema for comment subdocument
const mongoose = require('./connection')


const { Schema } = mongoose

// comment schema
const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

//// Export our Schema
module.exports = commentSchema