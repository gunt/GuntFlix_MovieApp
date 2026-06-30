const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Use env variable for consistency; fall back if not set
var jwtSecret = process.env.JWT_SECRET || 'guntflix_super_secret_2026';
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); // Your local passport file

// Transform snake_case Supabase user to CamelCase expected by frontend
function transformUser(user) {
  if (!user) return user;
  return {
    ...user,
    Username: user.username || user.Username,
    Email: user.email || user.Email,
    Birthday: user.birthday || user.Birthday,
    Password: user.password || user.Password
  };
}

/**
 * Generates JWT Token
 * @function generateJWTToken
 * @param object user
 * @returns string Token
 */
function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.username || user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
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
              user: transformUser(user),
              token
            });
          }
        );
      }
    )(req, res);
  });
};
