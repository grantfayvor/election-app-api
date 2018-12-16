const _service = new(require('../services/ServiceHelper'))();

function ControllerHelper() {
    this.service = _service;
}

ControllerHelper.prototype.save = function (req, res) {
    return this.service.save(req.body, (error, result) => {
        return res.send(error || result);
    });
};

ControllerHelper.prototype.findAll = function (req, res) {
    return this.service.findAll((error, result) => {
        return res.send(error || result);
    });
};

ControllerHelper.prototype.findById = function (req, res) {
    return this.service.findById(req.params.id, (error, result) => {
        return res.send(error || result);
    });
};

ControllerHelper.prototype.delete = function (req, res) {
    return this.service.deleteById(req.params.id, (error, result) => {
        return res.send(error || result);
    });
};

ControllerHelper.prototype.update = function (req, res) {
    return this.service.update(req.query, req.body, (error, result) => {
        return res.send(error || result);
    })
};

module.exports = ControllerHelper;