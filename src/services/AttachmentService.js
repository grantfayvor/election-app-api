function AttachmentService() {
    this.repository = new (require('../repositories/AttachmentRepository'))();
}

AttachmentService.prototype = Object.create(require('./ServiceHelper').prototype);

module.exports = AttachmentService;