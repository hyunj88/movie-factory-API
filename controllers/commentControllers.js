// import Dependenices
const express = require('express')
const Movie = require('../models/movie')

// Router
const router = express.Router()

//// Routes ////

// POST -> `/comments/<someMovieId>`
router.post('/:movieId', (req, res) => {
    const movieId = req.params.movieId
    if (req.session.loggedIn) {
        req.body.commentator = req.session.userId
        const theComment = req.body
        Movie.findById(movieId)
            .then(movie => {
                movie.comments.push(theComment)
                return movie.save()
            })
            .then(movie => {
                res.status(201).json({ movie: movie })
                // res.redirect(`/movies/${movie.id}`)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
                // res.redirect(`/error?error=${err}`)
            })
    } else {
        res.sendStatus(401)
        // res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20movie`)
    }
})

// DELETE -> `/comments/delete/<someMovieId>/<someCommentId>`
router.delete('/delete/:movieId/:commId', (req, res) => {
    const { movieId, commId } = req.params
    Movie.findById(movieId)
        .then(movie => {
            const theComment = movie.comments.id(commId)
            console.log('this is the comment to be deleted: \n', theComment)
            if (req.session.loggedIn) {
                if (theComment.commentator == req.session.userId) {
                    theComment.remove()
                    movie.save()
                    res.sendStatus(204)
                    // res.redirect(`/movies/${movie.id}`)
                } else {
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
                }
            } else {
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router