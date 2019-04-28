const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const axios = require('axios');

const keys = require('./config/keys');
require('./models/User');
const User = mongoose.model('users');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

mongoose.connect(
	keys.mongoURI,
	{
		useNewUrlParser: true
	}
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log('id', profile.id);
			console.log('email', profile.emails[0].value);

			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				console.log('found user:', existingUser.googleId);
				return done(null, existingUser);
			} else {
				const newUser = {
					googleId: profile.id,
					email: profile.emails[0].value
				};

				const user = await new User(newUser).save();
				console.log(user);
				done(null, user);
			}
		}
	)
);

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/api/currentUser', (req, res) => {
	// console.log(req.session);
	res.send(req.user);
});

app.get('/api/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/api/discover/fetch', (req, res) => {
	axios
		.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${
				keys.TMDBkey
			}&vote_count.gte=500&sort_by=vote_average.desc&total_results=100&page=2`
		)
		.then(results => {
			res.send(results.data);
		});
});

app.get('/api/movie_detail/:id', (req, res) => {
	axios
		.get(
			`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${
				keys.TMDBkey
			}&append_to_response=credits`
		)
		.then(results => res.send(results.data));
});

app.get('/api/watchlist/fetch', (req, res) => {
	// Alt version, just pulling from backend
	let movieIds = [];

	User.findById(req.user._id).then(user => {
		user.watchlist.forEach(movie => movieIds.push(movie.movieId));

		console.log('movieIds:', movieIds);

		let promises = movieIds.map(id => {
			axios
				.get(
					`https://api.themoviedb.org/3/movie/${id}?api_key=${
						keys.TMDBkey
					}`
				)
				.then(response => response.data);
		});

		Promise.all(promises).then(values => {
			console.log(values);
			return values;
		});
		// console.log(promises);
		// axios.all(promises)
	});

	res.send('received request!');
});

app.post('/api/watchlist/update', (req, res) => {
	// console.log(req.body);
	// console.log(req.user);

	if (req.body.action === 'add') {
		// Find user, check if watchlist contains this movie
		// If not, then execute this update

		const newMovie = { movieId: req.body.movieId };

		User.findOneAndUpdate(
			{
				_id: req.user._id,
				'watchlist.movieId': { $ne: req.body.movieId }
			},
			{ $push: { watchlist: newMovie } },
			{ new: true },
			(err, doc) => {
				if (err) {
					console.log('error:', err);
				} else {
					console.log(doc);
				}
			}
		);
	}

	res.send('received!');
});

app.listen(PORT, () => {
	console.log('App running on port 5000');
});
