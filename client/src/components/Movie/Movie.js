import React from 'react';

const Movie = props => {
	return (
		<div>
			<p>{props.title}</p>
			<p>{props.voteAverage}</p>
		</div>
	);
};

export default Movie;
