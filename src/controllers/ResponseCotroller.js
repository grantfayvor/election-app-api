const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/ResponseService'))(),
    debug = require('debug')('ResponseController::');

function ResponseController() {
    this.service = _service;
}

ResponseController.prototype = Object.create(_controllerHelper.prototype);

module.exports = ResponseController;