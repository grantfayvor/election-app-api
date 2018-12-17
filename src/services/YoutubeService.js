var env = process.env.NODE_ENV || 'dev',
    config = require('../config/config')(env),
    fs = require('fs'),
    readline = require('readline'),
    {
        google
    } = require('googleapis'),
    OAuth2 = google.auth.OAuth2,
    TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/',
    TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

function Youtube() {
    this.credentials = config.googleOauth.credentials;
    this.scopes = config.googleOauth.scopes;
    this.service = google.youtube('v3');
};

/**
 * this.is the function you need to call and pass createBroadcastAndBindToStream
 */
Youtube.prototype.authorize = function (callback) {
    var clientSecret = this.credentials.installed.client_secret;
    var clientId = this.credentials.installed.client_id;
    var redirectUrl = this.credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            this.getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
};

Youtube.prototype.getNewToken = function (oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.scopes,
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oauth2Client.getToken(code, (err, token) => {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            this.storeToken(token);
            callback(oauth2Client);
        });
    });
};

Youtube.prototype.storeToken = function (token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + TOKEN_PATH);
    });
    console.log('Token stored to ' + TOKEN_PATH);
};

Youtube.prototype.createBroadcastAndBindToStream = async function (auth) {
    this.auth = auth;
    try {
        var res = await Promise.all([this.createBroadcast(auth), this.createLiveStream(auth)]);
        this.liveBroadcast = res[0].data;
        this.liveStream = res[1].data;
        return this.bindStreamToBroadcast(this.liveBroadcast.id, this.liveStream.id)
            .then(res => {
                this.bindedBroadcast = res.data;
                return this.bindedBroadcast;
            });
    } catch (err) {
        throw new Error("An error occurred. " + err);
    }
};

Youtube.prototype.createBroadcast = function (auth) {
    return this.service.liveBroadcasts.insert({
        auth: auth || this.auth,
        part: 'snippet,status',
        requestBody: {
            snippet: {
                scheduledStartTime: new Date().toISOString(),
                scheduledEndTime: new Date().toISOString(),
                title: 'Random Broadcast'
            },
            status: {
                privacyStatus: 'private'
            },
            kind: 'youtube#liveBroadcast'
        }
    });
};

Youtube.prototype.createLiveStream = function (auth) {
    return this.service.liveStreams.insert({
        auth: auth || this.auth,
        part: 'snippet,cdn',
        requestBody: {
            snippet: {
                title: 'The stream title'
            },
            cdn: {
                format: '1080p',
                ingestionType: 'rtmp'
            },
            kind: 'youtube#liveStream'
        }
    });
};

Youtube.prototype.bindStreamToBroadcast = function (broadcastId, streamId) {
    return this.service.liveBroadcasts.bind({
        auth: this.auth,
        part: 'id,contentDetails',
        id: broadcastId,
        streamId: streamId
    });
};

module.exports = Youtube;