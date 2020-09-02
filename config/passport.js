const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const Budget = require('../models/budget');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
(accessToken, refreshToken, profile, cb) => {
    User.findOne({
        'googleId': profile.id
    },
    (err, user) => {
        if(err) return cb(err);
        
        if(user) {
            return cb(null, user);
        } else {
            const newUser = new User({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                googleId: profile.id
            });
            newUser.save(err => {
                if(err) return cb(err);
                const userId = newUser.id;
                Budget.create({ user: userId }, err => {
                    return cb(null, newUser);
                });
            });
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});