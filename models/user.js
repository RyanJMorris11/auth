const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Unique Emails
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On save hook, encrypt (runs before saving user)
userSchema.pre('save', function (next) {
  const user = this; // can get user.email || user. password

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (maybePass, callback) {
  bcrypt.compare(maybePass, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
