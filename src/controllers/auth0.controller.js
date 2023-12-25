const jwt = require('jsonwebtoken');
require('dotenv').config()

class Auth0Controller {
    async validateRoll(req, res, next) {
        const token = req.get('Authorization');
        let verify
        try {
            verify = jwt.verify(token, process.env.PRIVATE_KEY);
        } catch (error) {
            return res.status(402).json({ error: error.message });
        }
        if (verify.rol != 'user')
            next();
        else
            res.status(402).json({ error: `This user don't have permissions to publish` });
    }
}

module.exports = new Auth0Controller();