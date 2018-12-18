if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'prod') {
    process.env.DEBUG = '*';
    process.env.NODE_ENV = "prod";
}

const _mongoose = require('mongoose'),
    _fs = require('fs'),
    _debug = require('debug')('Election'),
    _express = require('express'),
    _passport = require('passport'),
    _cookieParser = require('cookie-parser'),
    _bodyParser = require('body-parser'),
    _jwt = require('jsonwebtoken'),
    _app = _express(),
    _multer = require('multer'),
    _upload = _multer({
        dest: 'public/uploads'
    });

module.exports = {
    multer: _upload,
    base64ToFile: require('./src/services/UtilityService').base64ToFile
};

const _config = require('./src/config/config')('prod'),
    _routes = require('./src/routes/index');


_app.use(_express.static('public'));
_app.use(_cookieParser());
const isAuthenticated = _passport.authenticate('jwt', {
    session: false
});

_app.use(_bodyParser.json({
        limit: '50mb'
    })),
    _app.use(_bodyParser.urlencoded({
        extended: false,
        limit: '50mb'
    })),
    _app.use(_express.static('public')),
    _app.use(_passport.initialize()),
    _app.use(_passport.session()),
    _app.use('/api/user', isAuthenticated, _routes.userRouter),
    _app.use('/api/report', isAuthenticated, _routes.reportRouter),
    require('./src/services/AuthenticationService')(_passport, _config);

_app.get('/', isAuthenticated, function (req, res) {
    res.sendFile("public/index.html");
});

_app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/public/login.html");
});

//TODO this route should be restricted to just admin
_app.post('/register', function (req, res, next) {

    const userService = new (require('./src/services/UserService'))();

    userService.save(req.body, (error, result) => {
        _debug(error);
        _debug(result);
        if (error) return res.status(500).json({
            message: 'An error occurred when trying to save the user.',
            user: req.body,
            error
        });
        _passport.authenticate('local', {
            session: false
        }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, {
                session: false
            }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = _jwt.sign({
                    id: user._id,
                    username: user.username,
                    rank: user.rank
                }, _config.auth.secret);
                delete user.password;
                return res.json({
                    user: user,
                    token
                });
            });
        })(req, res);
    });
});

_app.post('/login', function (req, res, next) {
    _passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Invalid login credentials',
                user: user,
                info
            });
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = _jwt.sign({
                id: user._id,
                username: user.email,
                rank: user.rank
            }, _config.auth.secret, {
                    expiresIn: '5h'
                });
            delete user.password;
            return res.json({
                user: user,
                token
            });
        });
    })(req, res);
});

_app.post('/test', require('./src/services/UtilityService').base64ToFile("test"), function (req, res) {
    res.send(req.body.test);
});

(function _init() {
    const _server = _app.listen(process.env.PORT || _config.app.port, () => _debug(`server started on port: ${_config.app.port}`));
    _mongoose.connect(`mongodb://${_config.database.host}:${_config.database.port}/${_config.database.name}`);
    // _mongoose.connect('mongodb://heroku_h6zr8sts:bf5d5sv3kqn53ah04t0o1qernt@ds237574.mlab.com:37574/heroku_h6zr8sts');
    // require('./test/faker');
})();
