// figure out what type of environment we're in, use relevant keys
if (process.env.NODE_ENV === 'production') {
	// return prod keys
	module.exports = require('./prod');
} else {
	// return dev keys
	module.exports = require('./dev');
}
