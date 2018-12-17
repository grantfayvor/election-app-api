const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    Report = new _Schema({
        reporter: {
            type: _Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        uploads: [],
        message: String
        // caption: String,
        // body: String,
        // attachments: [{
        //     type: _Schema.Types.ObjectId,
        //     ref: 'Attachment'
        // }]
    });

module.exports = {
    schema: Report,
    model: _mongoose.model('Report', Report)
};