// @ts-nocheck
const _router = require('express').Router(),
    _departmentController = new(require('../controllers/DepartmentController'))();

_router.post('/', _departmentController.save.bind(_departmentController));
_router.get('/', _departmentController.findAll.bind(_departmentController));
_router.get('/:id', _departmentController.findById.bind(_departmentController));
_router.put('/', _departmentController.update.bind(_departmentController));
_router.delete('/:id', _departmentController.delete.bind(_departmentController));

module.exports = _router;