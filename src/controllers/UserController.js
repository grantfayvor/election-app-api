const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/UserService'))(),
    debug = require('debug')('UserController::');

function UserController() {
    this.service = _service;
}

UserController.prototype = Object.create(_controllerHelper.prototype);

UserController.prototype.findUser = function (req, res) {
    return this.service.findAll((err, result) => {
        const _user = result.filter((data) => {
            return data.username.toUpperCase() === req.query.searchString.toUpperCase()
        })
        return res.send(err || _user);
    })
}

module.exports = UserController;