const jsonWebToken = require('jsonwebtoken');

const { existById } = require('../services/userService');

function verifyToken(req, res, next) {
    console.log(req.headers);
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jsonWebToken.verify(req.headers.authorization.split(' ')[1], 'JWT-SECRET', (err, decode) => {
            console.log(err, "    " + decode);
            if (err) {
                return res.status(403).json({
                    'success': false,
                    'message': 'Failed to authenticate.',
                    'status': 403,
                    'timestamp': Date.now()
                });
            } else {
                existById(decode.id).then(response => {
                    if (response.count > 0) {
                        next();
                    }
                });
            }
        });
    } else {
        return res.status(403).json({
            'success': false,
            'message': 'Failed to authenticate.',
            'status': 403,
            'timestamp': Date.now()
        });
    }
};

function getUserIdFromToken(req,res,next){
    return jsonWebToken.verify(req.headers.authorization.split(' ')[1], 'JWT-SECRET', (err, decode) => {
        console.log(decode.id);
        return decode.id;
    })
}

module.exports = { verifyToken,  getUserIdFromToken };