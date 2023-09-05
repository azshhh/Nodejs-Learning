const morgan = require('morgan')
const logger = require('./middleware/logger');
const genres = require('./routes/genres');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(morgan('tiny'));
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));