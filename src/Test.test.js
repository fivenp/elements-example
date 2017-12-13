import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Test from './Test'

describe('a suite', function() {
  it('returns div', function() {
    expect(shallow(<Test />).contains(<div className="foo">Bar</div>)).toBe(true)
  })
})
