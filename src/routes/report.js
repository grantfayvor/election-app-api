// @ts-nocheck
const _router = require('express').Router(),
    _reportController = new (require('../controllers/ReportController'))();

_router.get('/', _reportController.findAll.bind(_reportController));
_router.post('/', _reportController.save.bind(_reportController));
_router.get('/:id', _reportController.findById.bind(_reportController));
_router.put('/', _reportController.update.bind(_reportController));
_router.delete('/:id', _reportController.delete.bind(_reportController));

module.exports = _router;