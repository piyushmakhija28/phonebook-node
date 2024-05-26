const express = require('express');

const userDbFunctions = require('../services/userService');

const verifyToken = require('../middleware/authverification');

const bcrypt = require('bcrypt');

const router = express.Router();

router.post('', (req, res, next) => {
    let user = {
        'id': '',
        'firstName': '',
        'lastName': '',
        'mobileNumber': '',
        'email': '',
        'username': '',
        'password': ''
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.mobileNumber = req.body.mobileNumber;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);
    userDbFunctions.saveUser(user).then(response => {
        console.log('response ', response.count);
        res.status(201).json({
            'success': true,
            'message': 'Registration Successfull. Please check your email for verification.',
            'status': 201,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Registration Failed.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.put('/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId != 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.mobileNumber = req.body.mobileNumber;
    user.email = req.body.email;
    userDbFunctions.updateUser(user, req.params.id).then(response => {
        console.log('response ', response.count);
        res.status(200).json({
            'success': true,
            'message': 'User updated successfully.',
            'status': 201,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'User updation failed.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.get('/:limit/:offset', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId != 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    userDbFunctions.getUsers(req.params.limit, req.params.offset).then(response => {
        res.status(200).json({
            'data': response,
            'success': true,
            'message': 'Users Fetced Successfully.',
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to fetch users.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.get('/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId != 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    userDbFunctions.getUser(req.params.id).then(response => {
        res.status(200).json({
            'data': response[0],
            'success': true,
            'message': 'User Fetced Successfully.',
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to fetch user.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.delete('/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId != 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    userDbFunctions.deleteUser(req.params.id).then(response => {
        res.status(200).json({
            'success': true,
            'message': 'User Deleted Successfully.',
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'User Deletion Failed.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.patch('/activate/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId != 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    userDbFunctions.activateUser(req.params.id).then(response => {
        res.status(200).json({
            'success': true,
            'message': 'User Activated Successfully.',
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'User Activation Failed.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.patch('/deActivate/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId != 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    userDbFunctions.deActivateUser(req.params.id).then(response => {
        res.status(200).json({
            'success': true,
            'message': 'User De-Activated Successfully.',
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'User De-Activation Failed.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

module.exports = router;
