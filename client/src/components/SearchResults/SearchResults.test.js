import React from 'react'
import SearchResults from './SearchResults'

it('renders loading div when loading', () => {
  const movies = {
    isLoading: true,
    isError: false,
    data: [],
  }

  const wrapper = shallow(
    <SearchResults movies={movies} />,
  )

  expect(wrapper.find('.search-results__loading').length).toBe(1)
})

it('renders empty result div when there is no result', () => {
  const movies = {
    isLoading: false,
    isError: false,
    data: [],
  }

  const wrapper = shallow(
    <SearchResults movies={movies} />,
  )

  expect(wrapper.find('.search-results__none').length).toBe(1)
})
