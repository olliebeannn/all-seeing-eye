const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = {
  _id: { type: Number, required: true },
  title: String,
  overview: String,
  vote_count: Number,
  vote_average: Number,
  release_date: String,
  genres: [{ id: Number, name: String }],
  cast: [
    {
      id: Number,
      name: String
    }
  ],
  director: {
    id: Number,
    name: String
  },
  runtime: Number,
  original_language: String,
  poster_path: String,
  backdrop_path: String,
  savedAt: Date
};

mongoose.model('movies', movieSchema);
