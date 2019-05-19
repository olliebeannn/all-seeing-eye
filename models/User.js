const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  googleId: String,
  watchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ],
  seen: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
});

mongoose.model('users', userSchema);
