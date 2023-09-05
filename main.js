const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use('/api/genres', genres);
app.use(express.static('public'))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));