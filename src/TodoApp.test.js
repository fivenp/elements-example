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
  newText: 'testing',
})

describe('TodoApp', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have one .App div', () => {
    expect(wrapper.find('.App')).toHaveLength(1)
  })

  it('should have one #add-new', () => {
    expect(wrapper.find('#add-task')).toHaveLength(1)
  })

  it('should switch filter correctly', () => {
    const component = mount(<TodoApp />).setState({
      todos: [
        { text: 'Text 1', done: false },
        { text: 'Text 2', done: false },
        { text: 'Text 3', done: false },
      ],
      filter: 'all',
      newText: 'testing',
    })
    component.addTodo = jest.fn()
    component.update()
    component.find('#add-task').first().simulate('click')
    expect(component.addTodo).toHaveBeenCalled()
    //expect(component.find('TodoItem')).toHaveLength(4)
  })

  it('should render correct number of complete', () => {
    expect(completeWrapper.find('TodoItem')).toHaveLength(2)
  })
})
