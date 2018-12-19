function DepartmentService() {
    this.repository = new (require('../repositories/DepartmentRepository'))();
}

DepartmentService.prototype = Object.create(require('./ServiceHelper').prototype);

module.exports = DepartmentService;