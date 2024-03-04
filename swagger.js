'use sctrict';
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const { PORT, SERVER_URL } = process.env;

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Juan',
			description:
                'API endpoints for a mini blog services documented on swagger',
			contact: {
				name: 'Juan Mansilla',
				email: 'marcos.rehtanz@gmail.com',
				url: 'https://github.com/DesmondSanctity/node-js-swagger',
			},
			version: '1.0.0',
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
				description: 'Local server',
			},
			{
				url: `${SERVER_URL}`,
				description: 'Live server',
			},
		],
	},
	// looks for configuration in specified directories
	apis: ['./src/router/*.route.js'],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app) {
	// Swagger Page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	// Documentation in JSON format
	app.get('/docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
}
module.exports = swaggerDocs;
