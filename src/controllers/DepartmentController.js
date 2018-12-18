const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/DepartmentService'))(),
    debug = require('debug')('DepartmentController::');

function DepartmentController() {
    this.service = _service;
}

DepartmentController.prototype = Object.create(_controllerHelper.prototype);

module.exports = DepartmentController;