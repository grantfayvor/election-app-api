// if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'prod') {
//     process.env.DEBUG = '*';
// }

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
    base64ToFile: base64ToFile
};

const _config = require('./src/config/config')(process.env.NODE_ENV || 'dev'),
    _routes = require('./src/routes/index');


_app.use(_express.static('public'));
_app.use(_cookieParser());
const isAuthenticated = _passport.authenticate('jwt', {
    session: false
});

_app.use(_bodyParser.json({ limit: '50mb' })),
    _app.use(_bodyParser.urlencoded({
        extended: false,
        limit: '50mb'
    })),
    _app.use(_express.static('public')),
    _app.use(_passport.initialize()),
    _app.use(_passport.session()),
    _app.use('/api/user', isAuthenticated, _routes.userRouter),
    _app.use('/api/report', _upload.array('attachments', 6), /* isAuthenticated, */ _routes.reportRouter),
    require('./src/services/AuthenticationService')(_passport, _config);

_app.get('/', function (req, res) {
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

(function _init() {
    _app.listen(_config.app.port, () => _debug(`server started on port: ${_config.app.port}`));
    _mongoose.connect(`mongodb://${_config.database.host}:${_config.database.port}/${_config.database.name}`, (err, database) => {
        if (!err) console.log(`Database connected and running on port ${_config.app.port}`)
        else console.log(err);
    });
    // require('./test/faker');
})();

function base64ToFile(propertyName, nameLength = 20) {
    return function (request, response, next) {
        let data = request.body[propertyName];
        if (data) {
            const buffer = new Buffer(data.base64, 'base64');
            let type = "";
            switch (data.mime) {
                case 'image/jpeg' || 'image/jpg':
                    type = "jpg";
                    break;
                case 'image/png':
                    type = "png";
                    break;
                case 'image/mpeg' || 'video/mp4' || 'video/mpeg':
                    type = "mp4";
                    break;
                default:
                    type = "";
            }
            let code = randomCodeGenerator({
                alphaNumeric: true,
                size: nameLength,
                allowedCharacters: "aA#"
            }),
                pathForDb = `/public/uploads/${code}.${type}`,
                path = `${__dirname}${pathForDb}`,
                exists = _fs.existsSync(path);
            while (exists) {
                code = randomCodeGenerator({
                    alphaNumeric: true,
                    size: nameLength,
                    allowedCharacters: "aA#"
                }),
                    pathForDb = `/public/uploads/${code}.${type}`,
                    path = `${__dirname}${pathForDb}`,
                    exists = _fs.existsSync(path);
            }
            _fs.writeFileSync(path, buffer);
            request.body[propertyName] = pathForDb;
        }
        return next();
    }
}

function randomCodeGenerator({
    alphaNumeric,
    size,
    allowedCharacters
}) {
    if (alphaNumeric) {
        var container = "";
        if (allowedCharacters.indexOf("a") > -1) container += "abcdefghijklmnopqrstuvwxyz";
        if (allowedCharacters.indexOf("A") > -1) container += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (allowedCharacters.indexOf("#") > -1) container += "0123456789";
        if (allowedCharacters.indexOf("!") > -1) container += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
        var result = "";
        for (var i = 0; i < size; i++) result += container[Math.floor(Math.random() * container.length)];
        return result;
    }
    return Math.floor(Math.random() * Math.floor(Math.pow(10, size - 1)));
};