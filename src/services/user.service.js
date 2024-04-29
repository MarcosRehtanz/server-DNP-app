const UserModel = require('../models/user.model');

class UserService {
    async logIn(email) {
        try {
            const user = await UserModel.findOne({ _email: email }, '_userId _password');
            return user;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async getAll() {
        try {
            const users = await UserModel.find({}, '_userId _name _surname _email _dob _rol _image');
            return users;
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const user = await UserModel.findById(id, '_userId _name _surname _email _dob _rol _image');
            return user;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        }
    }

    async post(userData) {
        try {
            const newUser = new UserModel(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async update(userData) {
        try {
            const { _userId, ...updateData } = userData;
            const updatedUser = await UserModel.findByIdAndUpdate(_userId, updateData, { new: true });
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async disable(id) {
        try {
            const disabledUser = await UserModel.findByIdAndUpdate(id, { _deletedAt: Date.now() }, { new: true });
            return disabledUser;
        } catch (error) {
            console.error('Error disabling user:', error);
            throw error;
        }
    }
}

module.exports = new UserService();
