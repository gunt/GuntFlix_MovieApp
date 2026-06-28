const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./model.js'),
    passportJWT = require('passport-jwt');

var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

var JWT_SECRET = process.env.JWT_SECRET || 'guntflix_super_secret_2026';

passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {
    console.log(username + '  ' + password);
    Users.findOne({
        Username: username
    }, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('incorrect username');
            return callback(null, false, {
                message: 'Incorrect username or password.'
            });
        }
        // Supabase returns plain objects; use the imported validatePassword helper
        const Models = require('./model.js');
        if (!Models.User.validatePassword(password, user.password)) {
            console.log('incorrect password');
            return callback(null, false, {message: 'Incorrect password.'});
          }
        console.log('finished');
        return callback(null, user);
    });
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));