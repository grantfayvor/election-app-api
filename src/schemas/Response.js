const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    Response = new _Schema({
        report: {
            type: _Schema.Types.ObjectId,
            ref: 'Report',
            required: true
        },
        reporter: {
            type: _Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        response: String,
        createdAt: {
            type: Date,
            default: new Date()
        }
    });

module.exports = {
    schema: Response,
    model: _mongoose.model('Response', Response)
};