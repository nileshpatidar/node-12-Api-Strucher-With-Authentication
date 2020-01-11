
let jwt = require('jsonwebtoken');
require('dotenv').config()
let middelware = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.SECRET_KY, (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Token is not valid' });
                } else {
                    req.decoded = decoded; next();
                }
            });
        } else {
            return res.json({ success: false, message: 'Auth token is not supplied' });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: 'Token is not valid' });

    }
}

module.exports = {
    middelware
}