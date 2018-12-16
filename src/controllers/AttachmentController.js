const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/AttachmentService'))(),
    debug = require('debug')('AttachmentController::');

function AttachmentController() {
    this.service = _service;
}

AttachmentController.prototype = Object.create(_controllerHelper.prototype);

module.exports = AttachmentController;