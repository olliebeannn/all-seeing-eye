const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
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
			console.log('called!');
			console.log('profile', profile);
			done(null, profile);
		}
	)
);

app.use(passport.initialize());
// app.use(passport.session());

app.get('/', (req, res) => {
	res.send('Test!');
});

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		res.redirect('/');
	}
);

app.listen(5000, () => {
	console.log('App running on port 5000');
});
