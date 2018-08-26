import React from 'react'

import MovieDetails from '../MovieDetails'

import './SearchResults.css'

const SearchResults = ({ movies: { isLoading, isError, data } }) => {
  let movieDetailsList = []

  if (isLoading) {
    return (
      <div className="search-results__loading">
        Loading
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
      <div className="search-results__none">
        No Results Found
      </div>
    )
  }

  return (
    <div className="search-results">
      {movieDetailsList}
    </div>
  )
}

export default SearchResults
