const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const axios = require('axios');
const _ = require('lodash');

const keys = require('./config/keys');

require('./models/User');
const User = mongoose.model('users');
require('./models/Movie');
const Movie = mongoose.model('movies');

const simpleMovieAttributes = require('./utils/simpleMovieAttributes');
const { processMovieData } = require('./utils/processMovieData');

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
    res.redirect('/watchlist');
  }
);

app.get('/api/currentUser', (req, res) => {
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/api/discover/load-page', (req, res) => {
  let reqString = `https://api.themoviedb.org/3/discover/movie?api_key=${
    keys.TMDBkey
  }&vote_count.gte=500&sort_by=vote_average.desc`;

  // If there are genre filters applied
  if (req.body.genres && req.body.genres.length) {
    reqString += '&with_genres=' + req.body.genres.join('|');
  }

  // If there is start year filter, add it
  if (req.body.startYear) {
    reqString += `&primary_release_date.gte=${req.body.startYear}-01-01`;
  }

  if (req.body.endYear) {
    reqString += `&primary_release_date.lte=${req.body.endYear}-12-31`;
  }

  // Add the page param to request
  reqString += `&page=${req.body.page}`;
  // console.log('reqString with filters', reqString);

  axios.get(reqString).then(async response => {
    let returnData = response.data.results;

    let user = await User.findById(req.user._id);

    let watchlistMovies = await Movie.find({
      _id: { $in: user.watchlist }
    }).lean();

    let watchlistIds = watchlistMovies.map(movie => movie.movieId);

    let seenListMovies = await Movie.find({
      _id: { $in: user.seen }
    }).lean();
    let seenIds = seenListMovies.map(movie => movie.movieId);

    // Replace the data prop id with movieId to match cache DB
    returnData.forEach(result => {
      result.movieId = result.id;
      delete result.id;

      // Mark as onWatchlist or not
      if (watchlistIds.includes(result.movieId)) {
        result.onWatchlist = true;
      } else {
        result.onWatchlist = false;
      }

      // Mark as onSeen or not
      if (seenIds.includes(result.movieId)) {
        result.onSeen = true;
      } else {
        result.onSeen = false;
      }
    });

    res.send(returnData);
  });
});

// Load all data up to the given page, e.g. if page=3, return pages 1,2,3
app.post('/api/discover/load-all-pages', async (req, res) => {
  let reqString = `https://api.themoviedb.org/3/discover/movie?api_key=${
    keys.TMDBkey
  }&vote_count.gte=500&sort_by=vote_average.desc`;

  // If there are genre filters applied
  if (req.body.genres && req.body.genres.length) {
    console.log('req.body.genres', req.body.genres);
    reqString += '&with_genres=' + req.body.genres.join('|');
  }

  // If there is start year filter, add it
  if (req.body.startYear) {
    reqString += `&primary_release_date.gte=${req.body.startYear}-01-01`;
  }

  if (req.body.endYear) {
    reqString += `&primary_release_date.lte=${req.body.endYear}-12-31`;
  }

  let fullReturnData = [];

  // Add the page param to request
  let maxPage = req.body.page ? req.body.page : 1;

  for (let i = 1; i <= maxPage; i++) {
    let pageReqString = reqString + `&page=${i}`;
    // console.log('reqString with filters', pageReqString);

    let response = await axios.get(pageReqString);
    let returnData = response.data.results;

    let user = await User.findById(req.user._id);

    let watchlistMovies = await Movie.find({
      _id: { $in: user.watchlist }
    }).lean();

    let watchlistIds = watchlistMovies.map(movie => movie.movieId);

    let seenListMovies = await Movie.find({
      _id: { $in: user.seen }
    }).lean();
    let seenIds = seenListMovies.map(movie => movie.movieId);

    // Replace the data prop id with movieId to match cache DB
    returnData.forEach(result => {
      result.movieId = result.id;
      delete result.id;

      // Mark as onWatchlist or not
      if (watchlistIds.includes(result.movieId)) {
        result.onWatchlist = true;
      } else {
        result.onWatchlist = false;
      }

      // Mark as onSeen or not
      if (seenIds.includes(result.movieId)) {
        result.onSeen = true;
      } else {
        result.onSeen = false;
      }

      fullReturnData.push(_.cloneDeep(result));
    });
  }

  res.send(fullReturnData);
});

app.get('/api/movie_detail/:id', async (req, res) => {
  let movie = await Movie.findOne({ movieId: req.params.id }).lean();
  let user = await User.findById(req.user._id);

  // If movie is in DB, find out if it's on this user's watchlist
  // Add onWatchlist prop = true to return data
  if (movie) {
    let watchlistMovies = await Movie.find({
      _id: { $in: user.watchlist }
    }).lean();

    let watchlistIds = watchlistMovies.map(movie => movie.movieId);
    // console.log(watchlistIds);

    if (watchlistIds.includes(movie.movieId)) {
      movie.onWatchlist = true;
    } else {
      movie.onWatchlist = false;
    }

    console.log('in db return data', movie);
  }

  // If not in DB, save to DB and return the processed movie object
  // with watchlist status = false
  if (!movie) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${
        keys.TMDBkey
      }&append_to_response=credits`
    );

    const processedMovieData = processMovieData(response.data);
    const savedMovie = await new Movie(processedMovieData).save();

    movie = savedMovie.toObject();
    movie.onWatchlist = false;

    console.log('new movie saved to db', movie);
  }

  res.send(movie);
});

app.get('/api/watchlist/fetch', (req, res) => {
  // Alt version, just pulling from backend
  let movieIds = [];

  User.findById(req.user._id).then(async user => {
    // NEW: just query DB for users' watchlist
    const movies = await Movie.find({ _id: { $in: user.watchlist } }).lean();

    // Mark as onWatchlist so buttons show up correctly
    movies.forEach(movie => {
      movie.onWatchlist = true;
    });

    // Get Seen list and mark add onSeen prop so buttons show up properly
    const seenMovies = await Movie.find({ _id: { $in: user.seen } }).lean();
    let seenMovieIds = seenMovies.map(movie => movie.movieId);

    movies.forEach(movie => {
      if (seenMovieIds.includes(movie.movieId)) {
        movie.onSeen = true;
      } else {
        movie.onSeen = false;
      }
    });

    res.send(movies);
  });
});

app.get('/api/seen/fetch', (req, res) => {
  // Alt version, just pulling from backend
  let movieIds = [];

  User.findById(req.user._id).then(async user => {
    // NEW: just query DB for users' watchlist
    const movies = await Movie.find({ _id: { $in: user.seen } }).lean();

    let watchlistMovies = await Movie.find({
      _id: { $in: user.watchlist }
    }).lean();
    let watchlistIds = watchlistMovies.map(movie => movie.movieId);

    // Mark as onWatchlist so buttons show up correctly
    movies.forEach(movie => {
      movie.onSeen = true;

      if (watchlistIds.includes(movie.movieId)) {
        movie.onWatchlist = true;
      } else {
        movie.onWatchlist = false;
      }
    });

    res.send(movies);
  });
});

app.post('/api/update-list', async (req, res) => {
  // Check if movie is in DB
  // If not, pull all movie info and cache it
  let movie = await Movie.findOne({ movieId: req.body.movieId });

  if (!movie) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${
        keys.TMDBkey
      }&append_to_response=credits`
    );

    const processedMovieData = processMovieData(response.data);
    movie = await new Movie(processedMovieData).save();

    console.log('new movie saved!', movie);
  }

  if (req.body.action === 'add_watchlist') {
    // Find user, check if watchlist contains this movie
    // If not, then execute this update
    User.findOneAndUpdate(
      {
        _id: req.user._id,
        watchlist: { $ne: movie._id }
      },
      { $push: { watchlist: movie._id } },
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

  if (req.body.action === 'remove_watchlist') {
    console.log('remove movie!');

    User.findOneAndUpdate(
      {
        _id: req.user._id,
        watchlist: { $eq: movie._id }
      },
      {
        $pull: { watchlist: movie._id }
      },
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

  if (req.body.action === 'add_seen') {
    console.log('add movie to seen list!');

    User.findOneAndUpdate(
      {
        _id: req.user._id,
        seen: { $ne: movie._id }
      },
      { $push: { seen: movie._id } },
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

  if (req.body.action === 'remove_seen') {
    console.log('remove movie from seen list!');

    User.findOneAndUpdate(
      {
        _id: req.user._id,
        seen: { $eq: movie._id }
      },
      {
        $pull: { seen: movie._id }
      },
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

if (process.env.NODE_ENV === 'production') {
  // Make Express serve production assets, e.g. main.js
  app.use(express.static('client/build'));

  // Make Express serve index.html if it doesn't recognise route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('App running on port 5000');
});
