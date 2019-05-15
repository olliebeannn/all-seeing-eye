const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = {
  movieId: { type: Number, required: true },
  title: String,
  overview: String,
  vote_average: Number,
  genre_ids: [{ type: Number }],
  poster_path: String,
  backdrop_path: String,
  savedAt: Date
};

mongoose.model('movies', movieSchema);
