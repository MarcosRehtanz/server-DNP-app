const jwt = require('jsonwebtoken');
require('dotenv').config()

class Auth0Controller {
    pK = process.env.PRIMARY_KEY;
    async validateRoll(req, res, next){
        const token = req.get('Authorization');
        const verify = jwt.verify(token,this.pK);
        console.log(verify);
        const decode = jwt.decode(token);
        console.log(decode);
        res.status(200).json({decode});
    }
}

module.exports = new Auth0Controller();