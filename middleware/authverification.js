const jsonWebToken = require('jsonwebtoken');

const { existById } = require('../db/user');

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
        })
    } else {
        return res.status(403).json({
            'success': false,
            'message': 'Failed to authenticate.',
            'status': 403,
            'timestamp': Date.now()
        });
    }
};

module.exports = verifyToken;