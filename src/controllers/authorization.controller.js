const jwt = require('jsonwebtoken');
require('dotenv').config()

class AuthorizationController {
    async validateRoll(req, res, next) {
        try {
            const token = req.get('Authorization');
            const verify = jwt.verify(token, process.env.PRIVATE_KEY);
            if (verify.rol != 'user')
                next();
            else
                res.status(402).json({ error: `This user don't have permissions to publish` });
        } catch (error) {
            res.status(402).json({ error: error.message });
        }
    }
}

module.exports = new AuthorizationController();