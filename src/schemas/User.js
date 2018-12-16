const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    _bcrypt = require('bcrypt'),
    _config = require('../config/config')(process.env.NODE_ENV || 'dev');

const User = new _Schema({
    fullName: String,
    password: String,
    email: String,
    mobile: String
});

User.index({
    email: 1
}, {
    unique: true
});

User.pre("save", function (next) {
    if (!this.password || !this.email) throw new Error("username and password is required");
    this.password = _bcrypt.hashSync(this.password, _config.auth.saltRounds);
    next();
});

User.methods.confirmPassword = function (password) {
    return _bcrypt.compareSync(password, this.password);
};

module.exports = {
    schema: User,
    model: _mongoose.model('User', User)
};