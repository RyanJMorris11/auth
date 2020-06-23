const Aulthentication = require('./controllers/aulthentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' });
  });

  app.post('/signin', requireSignin, Aulthentication.signin);
  app.post('/signup', Aulthentication.signup);
};
