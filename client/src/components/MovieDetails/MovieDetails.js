import React from 'react'
import PropTypes from 'prop-types'

import shortenText from '../../helpers/shortenText'

import NoPoster from '../../assets/no-poster.jpg'

import './MovieDetails.css'


const MovieDetails = ({ movie: { Title, Poster, imdbID } }) => (
  <div className='movie-details'>
    <div className='movie-details__image'>
      <img
        src={Poster === 'N/A' ? NoPoster : Poster}
        alt={`${Title} cover`}
        height={350}
        width={263}
      />
    </div>
    <a
      href={`https://www.imdb.com/title/${imdbID}/`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <h3 className='movie-details__title'>{shortenText(Title, 40)}</h3>
    </a>
  </div>
)

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  }),
}

export default MovieDetails
