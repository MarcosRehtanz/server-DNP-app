const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const devocionalRoute = require('./router/devocional.js');
const eventRoute = require('./router/events.js');

const sqlite = require('./connect.db.js')
const PORT = process.env.PORT || 3001
const app = express();

app.use(morgan('dev'));

app.use('/devocional', devocionalRoute)
app.use('/event', eventRoute)

sqlite.connect(() => {
    app.listen(PORT, () => {
        console.log(`Server listener in port ${PORT}`);
    })
});