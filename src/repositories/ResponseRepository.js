const _BaseRepository = require('./BaseRepository'),
    Response = require('../schemas/Response').model;

function ResponseRepository() {
    this.model = Response;
};

ResponseRepository.prototype = Object.create(_BaseRepository.prototype);

module.exports = ResponseRepository;