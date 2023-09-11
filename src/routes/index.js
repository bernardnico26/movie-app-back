const express = require('express');
const genreRouter = require('./genre.router');
const moviesRouter = require('./movies.router');
const actorRouter = require('./actor.router');
const directorRouter = require('./director.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres',genreRouter)
router.use('/movies',moviesRouter)
router.use('/actors',actorRouter)
router.use('/directors',directorRouter)

module.exports = router;