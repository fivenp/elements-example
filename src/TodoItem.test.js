import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TodoItem from './TodoItem'

describe('TodoItem', () => {
  it('it should match snapshot', () => {
    const wrapper = shallow(<TodoItem id={0} done={false}>Some Text</TodoItem>)
    expect(wrapper).toMatchSnapshot();
  })
})
