// @ts-nocheck
const _router = require('express').Router(),
    _userController = new (require('../controllers/UserController'))();

_router.get('/', _userController.findAll.bind(_userController));
_router.get('/find', _userController.findUser.bind(_userController));
_router.post('/', _userController.save.bind(_userController));
_router.get('/:id', _userController.findById.bind(_userController));
_router.put('/', _userController.update.bind(_userController));
_router.delete('/:id', _userController.delete.bind(_userController));

module.exports = _router;