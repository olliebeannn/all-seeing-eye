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

// app.get('/', (req, res) => {
// 	res.send('Test!');
// });

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
  const page = req.query.page;

  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        keys.TMDBkey
      }&vote_count.gte=500&sort_by=vote_average.desc&total_results=100&page=${page}`
    )
    .then(async response => {
      let returnData = response.data.results;

      // console.log('returnData', returnData);

      let user = await User.findById(req.user._id);

      let watchlistMovies = await Movie.find({
        _id: { $in: user.watchlist }
      }).lean();

      let watchlistIds = watchlistMovies.map(movie => movie.movieId);

      console.log('watchlistIds', watchlistIds);

      // console.log('returnData', returnData);

      returnData.forEach(result => {
        result.movieId = result.id;
        delete result.id;

        if (watchlistIds.includes(result.movieId)) {
          result.onWatchlist = true;
        } else {
          result.onWatchlist = false;
        }
      });

      // console.log(returnData);

      res.send(returnData);
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

  User.findById(req.user._id).then(async user => {
    // NEW: just query DB for users' watchlist
    const movies = await Movie.find({ _id: { $in: user.watchlist } }).lean();

    // Mark as onWatchlist so buttons show up correctly
    movies.forEach(movie => {
      movie.onWatchlist = true;
    });

    // console.log(movies);

    res.send(movies);

    // OLD PROMISE VERSION PRE-CACHING IN DB
    // user.watchlist.forEach(movie => movieIds.push(movie.movieId));
    // let promises = movieIds.map(id => {
    //   return axios
    //     .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${keys.TMDBkey}`)
    //     .then(response => response.data);
    // });
    //
    // Promise.all(promises).then(data => {
    //   data.forEach(movie => {
    //     movie.onWatchlist = true;
    //   });
    //
    //   res.send(data);
    // });
  });
});

app.post('/api/watchlist/update', async (req, res) => {
  // console.log('called /api/watchlist/update');

  // Check if movie is in DB
  // If not, pull all movie info and cache it
  let movie = await Movie.findOne({ movieId: req.body.movieId });

  if (req.body.action === 'add') {
    if (!movie) {
      // try {
      //   console.log(
      //     `https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${
      //       keys.TMDBkey
      //     }&append_to_response=credits`
      //   );

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${
          keys.TMDBkey
        }&append_to_response=credits`
      );
      // } catch (e) {
      //   console.log('error fetching movie details', e);
      // }

      const fullMovieData = response.data;

      //Grab  attributes with same variable names
      const cacheMovieData = _.pick(fullMovieData, simpleMovieAttributes);

      //Add other data that needs special processing
      cacheMovieData.movieId = fullMovieData.id;
      cacheMovieData.genres = _.cloneDeep(fullMovieData.genres);

      // Extract director info from credits arrays
      const directorArray = fullMovieData.credits.crew.filter(
        crewMem =>
          crewMem.department === 'Directing' && crewMem.job === 'Director'
      );

      if (directorArray.length > 0) {
        cacheMovieData.director = {
          id: directorArray[0].id,
          name: directorArray[0].name
        };
      }

      // Extract first 10 cast members info
      const cast = _.cloneDeep(fullMovieData.credits.cast.slice(0, 10));
      cacheMovieData.cast = cast;

      cacheMovieData.savedAt = Date.now();

      movie = await new Movie(cacheMovieData).save();
      console.log('new movie saved!', movie);
    }

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

  if (req.body.action === 'remove') {
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

    // User.findOneAndUpdate(
    //   {
    //     _id: req.user._id
    //     watchlist: { $eq: req.body.movieId }
    //   },
    //   {
    //     // $pull: { watchlist: { movieId: req.body.movieId } }
    //   },
    //   { new: true },
    //   (err, doc) => {
    //     if (err) {
    //       console.log('err', err);
    //     } else {
    //       console.log(doc);
    //     }
    //   }
    // );
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
