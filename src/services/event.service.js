'use strict';
const EventModel = require('../models/event.model');

class EventService {
    async getAll() {
        try {
            const events = await EventModel.find({});
            return events;
        } catch (error) {
            console.error('Error getting events:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const event = await EventModel.findById(id);
            return event;
        } catch (error) {
            console.error('Error getting event by ID:', error);
            throw error;
        }
    }

    async post(eventData) {
        try {
            const newEvent = new EventModel(eventData);
            await newEvent.save();
            return newEvent;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    async update(eventData) {
        try {
            const { _id, ...updateData } = eventData;
            const updatedEvent = await EventModel.findByIdAndUpdate(_id, updateData, { new: true });
            return updatedEvent;
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    async disable(id) {
        try {
            const disabledEvent = await EventModel.findByIdAndUpdate(id, { _deletedAt: Date.now() }, { new: true });
            return disabledEvent;
        } catch (error) {
            console.error('Error disabling event:', error);
            throw error;
        }
    }
}

module.exports = new EventService();
