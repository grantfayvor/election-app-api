// @ts-nocheck
const _router = require('express').Router(),
    _responseController = new(require('../controllers/ResponseCotroller'))();

_router.post('/', _responseController.save.bind(_responseController));
_router.get('/', _responseController.findAll.bind(_responseController));
_router.get('/getResponse/:id', _responseController.getResponse.bind(_responseController));
_router.get('/:id', _responseController.findById.bind(_responseController));
_router.put('/', _responseController.update.bind(_responseController));
_router.delete('/:id', _responseController.delete.bind(_responseController));

module.exports = _router;