const _BaseRepository = require('./BaseRepository'),
    _Report = require('../schemas/Report').model;

function ReportRepository() {
    this.model = _Report;
};

ReportRepository.prototype = Object.create(_BaseRepository.prototype);

module.exports = ReportRepository;