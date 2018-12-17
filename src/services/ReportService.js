function ReportService() {
    this.repository = new(require('../repositories/ReportRepository'))();
}

ReportService.prototype = Object.create(require('./ServiceHelper').prototype);

ReportService.prototype.goLive = function (callback) {
    var youtubeService = new(require('./YoutubeService'))();
    youtubeService.authorize(auth => {
        youtubeService.createBroadcastAndBindToStream(auth).then(_ => {
            callback(youtubeService.liveBroadcast, youtubeService.liveStream, youtubeService.bindedBroadcast);
        });
    });
};

module.exports = ReportService;