import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { callbackify } from "util";


const google = GoogleStrategy.Strategy


passport.use(
    new google(
        {clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:  process.env.GOOGLE_SECRET as string,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        scope: ['profile', 'email']

        },

        async (accesstoken, refreshtoken, profile, done) => {
                done(null, 'profile')
        }
    ))


passport.serializeUser((user, done) => {
    done(null, user)
})


passport.deserializeUser((user, done) => {
        done(null, user)
})


