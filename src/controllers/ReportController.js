const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/ReportService'))(),
    debug = require('debug')('ReportController::');

function ReportController() {
    this.service = _service;
}

ReportController.prototype = Object.create(_controllerHelper.prototype);

ReportController.prototype.goLive = function (request, response) {
    this.service.goLive((liveBroadcast, liveStream, bindedBroadcast) => {
        response.send({
            ingestionAddress: liveStream && liveStream.cdn.ingestionInfo.ingestionAddress,
            embedHtml: bindedBroadcast && bindedBroadcast.contentDetails.monitorStream.embedHtml
        });
    });
};

ReportController.prototype.populateAll = function (req, res) {
    return this.service.findByParamAndPopulate({}, ("reporter"), (err, result) => {
        return res.send(err || result);
    })
}

ReportController.prototype.fetchReport = function (req, res) {
    return this.service.findById(req.params.id, (err, result) => {
        return res.send(err || result);
    })
}

module.exports = ReportController;