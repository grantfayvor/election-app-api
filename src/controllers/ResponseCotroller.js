const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/ResponseService'))(),
    debug = require('debug')('ResponseController::');

function ResponseController() {
    this.service = _service;
}

ResponseController.prototype = Object.create(_controllerHelper.prototype);

ResponseController.prototype.getResponse = function (req, res) {
    return this.service.findByParamAndPopulate({ reporter: req.params.id }, ("report"), (err, result) => {
        return res.send(err || result);
    })
}

module.exports = ResponseController;