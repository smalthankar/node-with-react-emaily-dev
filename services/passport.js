const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');

const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({googleID:profile.id});

            if(existingUser){
                // we already have a user with the ID
                return done(null, existingUser);
            }
            // we don't have a user with the ID, so create it!
            const user = await new User({ googleID: profile.id}).save()

            done(null, user);

        }
    )
);