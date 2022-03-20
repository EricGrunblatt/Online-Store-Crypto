const express = require('express');
const cookie_parser = require('cookie-parser');
const router = require('./routes/router')
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookie_parser());
app.use('/api', router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
