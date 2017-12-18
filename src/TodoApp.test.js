import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TodoApp from './TodoApp'

const wrapper = shallow(<TodoApp />)
const completeWrapper = wrapper.setState({
  todos: [
    { text: 'Text 1', done: false },
    { text: 'Text 2', done: true },
    { text: 'Text 3', done: true },
  ],
  filter: 'completed',
})

describe('TodoApp', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have one .App div', () => {
    expect(wrapper.find('.App')).toHaveLength(1)
  })

  it('should switch filter correctly', () => {
    /*
    wrapper.find('#add-task').simulate('click')
    expect(wrapper.find('TodoItem')).toHaveLength(4)
    */
  })

  it('should render correct number of incomplete', () => {
    expect(completeWrapper.find('TodoItem')).toHaveLength(2)
  })
})
