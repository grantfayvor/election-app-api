function ReportService() {
    this.repository = new (require('../repositories/ReportRepository'))();
}

ReportService.prototype = Object.create(require('./ServiceHelper').prototype);

module.exports = ReportService;