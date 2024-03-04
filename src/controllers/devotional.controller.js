const DevocionalService = require('../services/devotional.service.js');
const { someNull } = require('../utils/validates.js');

class DevotionalController {

	async getAllDevotionals(req, res) {
		try {
			const devotionals = await DevocionalService.getAll();
			res.status(200).json(devotionals);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}
	async getDevotionalById(req, res) {
		const { id } = req.params;
		try {
			const [devotional, status] = await DevocionalService.getById(id);
			res.status(status).json(devotional);
		} catch (error) {
			console.error(error);
			res.status(500).send({error});
		}
	}
	async postDevotional(req, res) {
		const { title, description, userId } = req.body;
		if (someNull(title, description, userId))
			res.status(400).json(new Error('Invalides'));

		const insert = [title, description, new Date(), userId];
		try {
			const response = await DevocionalService.post(insert);
			res.status(200).json({result: response});
		} catch (error) {
			console.error(error);
			res.statu(500).json({error: error.message});
		}
	}
}

module.exports = new DevotionalController();