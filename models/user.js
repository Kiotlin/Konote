var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    registerDate: { type: String, default: Date.now },
    displayName: String
});

userSchema.methods.name = function() {
    return this.displayName || this.username;
}

// password checkment
userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    })
}

var noop = function() {}
//use bcrypt to hash password
userSchema.pre("save", function(done) {
    var user = this;
    if(!user.isModified("password")) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) {
            return done(err);
        }

        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if(err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

var User = mongoose.model("User", userSchema);
module.exports = User;

