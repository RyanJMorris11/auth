const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Local strategy
const LocalOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(LocalOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return dne(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Setup Options - where is the json web token (jwt)?
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// payload = {sub: user.id, iat: timestamp}
// done: function - Call with user obj if good, or empty if bad
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  console.log('Checking Auth Token');
  console.log(payload);

  User.findById(payload.sub, function (err, user) {
    if (err) {
      console.log('Error Aulthentication Query');
      return done(err, false); // connection error or something
    }
    if (user) {
      console.log('user successfully found');
      done(null, user); // user successfully found
    } else {
      console.log("can't find user");
      done(null, false); // no error, but couldn't find user
    }
  });
});

// Tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);
