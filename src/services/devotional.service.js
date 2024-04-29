const DevotionalModel = require('../models/devotional.model');

class DevotionalService {
    async getAll() {
        try {
            const devotionals = await DevotionalModel.find({})
                .populate('_userId', '_name _surname _image')
                .sort({ _date: -1 });
            return devotionals;
        } catch (error) {
            console.error('Error getting devotionals:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const devotional = await DevotionalModel.findById(id)
                .populate('_userId', '_name _surname _image');
            if (!devotional) return [null, 404];
            return [devotional, 200];
        } catch (error) {
            console.error('Error getting devotional by ID:', error);
            throw error;
        }
    }

    async post(devotionalData) {
        try {
            const newDevotional = new DevotionalModel(devotionalData);
            await newDevotional.save();
            return newDevotional;
        } catch (error) {
            console.error('Error creating devotional:', error);
            throw error;
        }
    }
}

module.exports = new DevotionalService();
