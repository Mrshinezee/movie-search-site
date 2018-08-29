import React from 'react'
import { Search } from './Search'

const searchMovie = jest.fn()
const setKeyword = jest.fn()

it('renders without <Search /> crashing', () => {
  const wrapper = shallow(
    <Search setKeyword={setKeyword} searchMovie={searchMovie} />
  )

  expect(wrapper.find('.search__title').length).toBe(1)
})
