const express = require('express');
const router = express.Router();

const Joi = require('joi');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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
    // Validating req.body input
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    // console.log(error.details[0].message);

    // Add request genre to genres array
    const genre = {
        id: genres.length + 1,
        name: req.body.name // we need a middleware
    }

    // Push genre to genres
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    // Find genre
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    // if not exist - 404
    if (!genre) return res.status(404).send('Course with given id was not found!');

    // validation
    const { error } = validateGenre(req.body);
    // input error - 400
    if (error) return res.status(404).send(error.details[0].message);

    // PUT logic
    genre.name = req.body.name;
    // send updated genre
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    // Find genre
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    // if not exist - 404
    if (!genre) return res.status(404).send('Course with given id was not found!');


    // we take index of genre
    const index = genres.indexOf(genre);
    // we splice out the indexed genre 
    genres.splice(index, 1);

    // send deleted genre
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;