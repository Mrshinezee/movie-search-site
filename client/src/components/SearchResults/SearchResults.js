import React from 'react'
import PropTypes from 'prop-types'

import MovieDetails from '../MovieDetails'
import Loader from '../Loader'

import './SearchResults.css'

const SearchResults = ({ movies: { isLoading, isError, data } }) => {
  let movieDetailsList = []

  if (isLoading) {
    return (
      <div className='search-results__loading'>
        <Loader />
      </div>
    )
  }

  if (!isLoading && !isError && data) {
    movieDetailsList = data.map(movie => (
      <MovieDetails key={movie.imdbID} movie={movie} />
    ))
  }

  if (data && data.length === 0) {
    return (
      <div className='search-results__none'>
        No Results Found
      </div>
    )
  }

  return (
    <div className='search-results'>
      {movieDetailsList}
    </div>
  )
}

SearchResults.propTypes = {
  movies: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    data: PropTypes.array,
  }),
}

export default SearchResults
