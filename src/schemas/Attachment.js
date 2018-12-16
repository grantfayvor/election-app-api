const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    Attachment = new _Schema({
        path: {
            type: String,
            required: true
        },
        mime: String
    });

module.exports = {
    schema: Attachment,
    model: _mongoose.model('Attachment', Attachment)
};