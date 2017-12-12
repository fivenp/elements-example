import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Test from './Test'

describe('a suite', () => {
  it('renders without crashing', () => {
    expect(shallow(<Test />).contains(<div>hello</div>)).toBe(true)
  })
})
