const express = require('express');

const jsonWebToken = require('jsonwebtoken');

const userService = require('../services/userService');

const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/login', (req, res, next) => {
    let user = {
        'id': '',
        'firstName': '',
        'lastName': '',
        'mobileNumber': '',
        'email': '',
        'username': '',
        'password': ''
    }
    userService.login(req.body.username).then(response => {
        if (response.length > 0) {
            const userObject = response[0];
            user.id = userObject.id;
            user.firstName = userObject.first_name;
            user.lastName = userObject.last_name;
            user.mobileNumber = userObject.mobile_number;
            user.email = userObject.email;
            let data = Object.fromEntries(Object.entries(user).filter(([k, v]) => v));
            data.token = jsonWebToken.sign({
                id: user.id
            }, 'JWT-SECRET', {
                expiresIn: '1h'
            });
            if (userObject.is_active) {
                if (bcrypt.compareSync(req.body.password, userObject.password)) {
                    res.status(200).json({
                        'data': data,
                        'success': true,
                        'message': 'Authentication Successfull.',
                        'status': 200,
                        'timestamp': Date.now()
                    });
                } else {
                    res.status(403).json({
                        'success': false,
                        'message': 'Failed to authenticate.',
                        'status': 403,
                        'timestamp': Date.now()
                    });
                }
            } else {
                res.status(403).json({
                    'success': false,
                    'message': 'User is not active. Please contact your administrator.',
                    'status': 403,
                    'timestamp': Date.now()
                });
            }
        } else {
            res.status(403).json({
                'success': false,
                'message': 'Failed to authenticate.',
                'status': 403,
                'timestamp': Date.now()
            });
        }
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to authenticate.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

module.exports = router;