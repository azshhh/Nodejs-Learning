const express = require('express');
const router = express.Router();

router.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Romance' },
]

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Course with given id was not found!');
    res.send(genre);
});

router.post('/', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(404).send('Name is required and should be minimum 3 characters!');
        return
    }
    
    // Add request genre to genres array
    const genre = {
        id: genres.length + 1,
        name: req.body.name // we need a middleware
    }

    // Push genre to genres
    genres.push(genre);
    res.send(genres);
});



module.exports = router;