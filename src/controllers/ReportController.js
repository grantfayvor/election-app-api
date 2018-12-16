const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/ReportService'))(),
    debug = require('debug')('ReportController::');

function ReportController() {
    this.service = _service;
}

ReportController.prototype = Object.create(_controllerHelper.prototype);

module.exports = ReportController;