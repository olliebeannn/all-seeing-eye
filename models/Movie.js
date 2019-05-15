const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = {
  movieId: { type: Number, required: true },
  title: String,
  overview: String,
  vote_count: Number,
  vote_average: Number,
  release_date: Number,
  genre_ids: [{ type: Number }],
  runtime: Number,
  original_language: String,
  poster_path: String,
  backdrop_path: String,
  savedAt: Date
};

mongoose.model('movies', movieSchema);
