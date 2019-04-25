import React from 'react';

const Movie = props => {
	return (
		<div>
			<p>{props.title}</p>
			<p>{props.vote_average}</p>
		</div>
	);
};

export default Movie;
