import React from 'react'
import { Search, mapStateToProps, mapDispatchToProps } from './Search'

const searchMovie = jest.fn()
const setKeyword = jest.fn()

it('renders without <Search /> crashing', () => {
  const movies = {
    isLoading: true,
    isError: false,
    data: null,
  }
  const wrapper = shallow(
    <Search
      setKeyword={setKeyword}
      searchMovie={searchMovie}
      movies={movies}
    />,
  )

  expect(wrapper.find('.search__title').length).toBe(1)
})

it('check for the correct keyword value', () => {
  expect(
    mapStateToProps({
      keyword: 'test',
      results: {
        test: {},
      },
    }).keyword,
  ).toBe('test')
})

it('should discpatch setKeyword action', () => {
  const dispatch = jest.fn()

  mapDispatchToProps(dispatch).setKeyword()
  expect(dispatch.mock.calls[0][0].type).toEqual('SET_WORD')
})

it('should discpatch searchMovie action', () => {
  const dispatch = jest.fn()

  mapDispatchToProps(dispatch).searchMovie()
  expect(dispatch.mock.calls[0][0].type).toEqual('SEARCH_MOVIE')
})
