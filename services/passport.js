const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');

const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleID:profile.id})
                .then((existingUser) => {
                    if(existingUser){
                        // we already have a user with the ID
                        done(null, existingUser);
                    }else{
                        // we don't have a user with the ID, so create it!
                        new User({ googleID: profile.id})
                            .save()
                            .then(user => {
                                done(null, user);
                            });
                    }
                });


        }
    )
);