const _BaseRepository = require('./BaseRepository'),
    _User = require('../schemas/User').model;

function UserRepository() {
    this.model = _User;
};

UserRepository.prototype = Object.create(_BaseRepository.prototype);

module.exports = UserRepository;