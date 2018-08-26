import React from 'react'
import Loader from './Loader'

it('renders without <Loader /> crashing', () => {
  const wrapper = shallow(<Loader />)

  expect(wrapper.find('.loader').length).toBe(1)
})
