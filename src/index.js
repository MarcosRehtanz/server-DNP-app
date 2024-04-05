const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const swaggerDocs = require('../swagger.js');

const devocionalRoute = require('./router/devotional.route.js');
const eventRoute = require('./router/event.route.js');
const userRoute = require('./router/user.route.js');

const sqlite = require('./connect.db.js');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/devotional', devocionalRoute);
app.use('/event', eventRoute);
app.use('/user', userRoute);

sqlite.connect(() => {
	app.listen(PORT, () => {
		console.log(`Server listener in port ${PORT}`);
	});
	swaggerDocs(app, PORT);
});