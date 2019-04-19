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
			movieId: Number,
			savedAt: {
				type: Date,
				default: Date.now
			}
		}
	]
});

mongoose.model('users', userSchema);
