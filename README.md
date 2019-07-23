# The All Seeing Eye

The All Seeing Eye is an app to discover movies you want to watch for later so you don't get into a decisionmaking black hole when you actually have time to watch one.

## Use

The app is hosted on [Heroku](theallseeingeye.herokuapp.com) - try it out there!

## Technologies

TASE runs on a Heroku server with a Mongo, Express, and Node.js backend and a React front-end. State is managed in Redux with Redux Thunk, and I designed the UI and wrote the CSS without using front-end libraries. TASE is responsive and works well on mobile devices. Users create accounts and log in with Google OAuth (with help from Passport.js). The movie info is pulled from The Movie Database API and cached in Mongo to reduce the number of calls to the API.

## Features

Users can filter the highest rated movies from TMDB by release year and genre, and save movies to a watchlist for later, or mark them as seen so they aren't surfaced in the Discover tab. The app caches movies after they've been loaded or saved to a list to reduce the number of calls to the TMDB API.

## Future Development

- Create more movie filters, e.g. by number of reviews, average rating, cast and director
- Build friend relationships between users and prioritise movies that your friends have also saved
