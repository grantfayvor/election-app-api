const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    Department = new _Schema({
        name: String
    });

module.exports = {
    schema: Department,
    model: _mongoose.model('Department', Department)
};