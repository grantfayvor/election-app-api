const _BaseRepository = require('./BaseRepository'),
    Attachment = require('../schemas/Attachment').model;

function AttachmentRepository() {
    this.model = Attachment;
};

AttachmentRepository.prototype = Object.create(_BaseRepository.prototype);

module.exports = AttachmentRepository;