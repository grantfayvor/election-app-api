module.exports = function (passport, config) {
    const LocalStrategy = require('passport-local').Strategy,
        passportJWT = require("passport-jwt"),
        JWTStrategy = passportJWT.Strategy,
        ExtractJWT = passportJWT.ExtractJwt,
        userService = new(require('./UserService'))(),
        User = require('../schemas/User').model;

    passport.use(new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        function (email, password, done) {
            userService.findOneByParam({
                email: email.trim()
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Invalid credentials.'
                    });
                }
                if (!user.confirmPassword(password)) {
                    return done(null, false, {
                        message: 'Invalid credentials.'
                    });
                }
                return done(null, user);
            });
        }
    ));

    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.auth.secret
        },
        function (jwtPayload, done) {
            return userService.findById(jwtPayload.id, (err, user) => {
                if (err) return done(err);
                delete user.password;
                return done(null, user);
            });
        }
    ));
};