const _ = require('lodash');
const simpleMovieAttributes = require('./simpleMovieAttributes');

const processMovieData = responseData => {
  //Grab  attributes with same variable names
  const cacheMovieData = _.pick(responseData, simpleMovieAttributes);

  //Add other data that needs special processing
  cacheMovieData.movieId = responseData.id;
  cacheMovieData.genres = _.cloneDeep(responseData.genres);

  // Extract director info from credits arrays
  const directorArray = responseData.credits.crew.filter(
    crewMem => crewMem.department === 'Directing' && crewMem.job === 'Director'
  );

  if (directorArray.length > 0) {
    cacheMovieData.director = {
      id: directorArray[0].id,
      name: directorArray[0].name
    };
  }

  // Extract first 10 cast members info
  const cast = _.cloneDeep(responseData.credits.cast.slice(0, 10));
  cacheMovieData.cast = cast;

  cacheMovieData.savedAt = Date.now();

  return cacheMovieData;
};

module.exports = { processMovieData };
