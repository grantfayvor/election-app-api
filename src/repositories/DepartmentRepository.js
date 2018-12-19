const _BaseRepository = require('./BaseRepository'),
    Department = require('../schemas/Department').model;

function DepartmentRepository() {
    this.model = Department;
};

DepartmentRepository.prototype = Object.create(_BaseRepository.prototype);

module.exports = DepartmentRepository;