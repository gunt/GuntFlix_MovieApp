const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Use env variable for consistency; fall back if not set
var jwtSecret = process.env.JWT_SECRET || 'guntflix_super_secret_2026'; // This has to be the same key used in the JWTStrategy
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); // Your local passport file

/**
 * Generates JWT Token
 * @function generateJWTToken
 * @param object user
 * @returns string Token
 */
function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}

/**
 * Module exports user Tokens
 * @exports exports
 * @param object router
 * @returns object user/Token
 */
/* POST login. */
module.exports = router => {
  router.post('/login', (req, res) => {
    passport.authenticate(
      'local',
      {
        session: false
      },
      (error, user, _info) => {
        if (error || !user) {
          return res.status(400).json({
            message: 'Something is not right',
            user: user
          });
        }
        req.login(
          user,
          {
            session: false
          },
          error => {
            if (error) {
              res.send(error);
            }
            var token = generateJWTToken(user);
            return res.json({
              user,
              token
            });
          }
        );
      }
    )(req, res);
  });
};
