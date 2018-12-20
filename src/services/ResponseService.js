function ResponseService() {
    this.repository = new (require('../repositories/ResponseRepository'))();
}

ResponseService.prototype = Object.create(require('./ServiceHelper').prototype);

module.exports = ResponseService;