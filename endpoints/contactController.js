const express = require('express');

const verifyToken = require('../middleware/authverification');

const constactService = require('../services/contactService');

const router = express.Router();

router.post('', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId == 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    constactService.saveContacts(req.body, userId).then(response => {
        console.log(response.count);
        res.status(201).json({
            'message': 'Contact added successfully.',
            'success': true,
            'status': 201,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to add contact.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.put('/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId == 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    constactService.updateContacts(req.params.id, req.body).then(response => {
        console.log(response.count);
        res.status(200).json({
            'message': 'Contact updated successfully.',
            'success': true,
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to update contact.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.get('/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId == 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    constactService.getContact(req.params.id).then(response => {
        console.log(response.count);
        res.status(200).json({
            'data': response[0],
            'message': 'Contact fetched successfully.',
            'success': true,
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to fetch contact.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.get('/:limit/:offset', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId == 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    constactService.getContacts(userId,req.params.limit,req.params.offset).then(response => {
        console.log(response.count);
        res.status(200).json({
            'data': response,
            'message': 'Contacts fetched successfully.',
            'success': true,
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to fetch contacts.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

router.delete('/:id', verifyToken.verifyToken, (req, res, next) => {
    var userId = verifyToken.getUserIdFromToken(req, res, next);
    if (userId == 1) {
        return res.status(401).json({
            'success': false,
            'message': 'Your are not authorized to access this endpoint.',
            'status': 401,
            'timestamp': Date.now()
        });
    }
    constactService.deleteContact(req.params.id).then(response => {
        console.log(response.count);
        res.status(200).json({
            'message': 'Contact deleted successfully.',
            'success': true,
            'status': 200,
            'timestamp': Date.now()
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            'success': false,
            'message': 'Failed to delete contact.',
            'status': 500,
            'timestamp': Date.now()
        });
    });
});

module.exports = router;