import React from 'react'
import SearchForm from './SearchForm'

const searchMovie = jest.fn()
const setKeyword = jest.fn()

it('renders without <SearchForm /> crashing', () => {
  const keyword = 'demo'

  const wrapper = shallow(
    <SearchForm
      keyword={keyword}
      setKeyword={setKeyword}
      searchMovie={searchMovie}
    />
  )

  expect(wrapper.find('.search-form').length).toBe(1)
  expect(wrapper.find('.search-form__field').length).toBe(1)
})
