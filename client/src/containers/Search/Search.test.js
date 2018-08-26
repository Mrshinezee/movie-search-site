import React from 'react'
import Search from './Search'

it('renders without <Search /> crashing', () => {
  const wrapper = shallow(<Search />)

  expect(wrapper.find('h1').length).toBe(1)
})
