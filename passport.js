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
}, async (username, password, callback) => {
    console.log(username + '  ' + password);
    try {
      const user = await Users.findOne({ Username: username });
      if (!user) {
        console.log('incorrect username');
        return callback(null, false, {
          message: 'Incorrect username or password.'
        });
      }
      const isValid = await Users.validatePassword(password, user.password);
      if (!isValid) {
        console.log('incorrect password');
        return callback(null, false, { message: 'Incorrect password.' });
      }
      console.log('finished');
      return callback(null, user);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, async (jwtPayload, callback) => {
    try {
      const user = await Users.findOne({ Username: jwtPayload.Username });
      return callback(null, user);
    } catch (error) {
      return callback(error);
    }
}));
