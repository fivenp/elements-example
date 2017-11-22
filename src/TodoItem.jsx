import React from 'react'
import PropTypes from 'prop-types'
import Text from '@allthings/elements/atoms/Text'
import ListItem from '@allthings/elements/molecules/List/ListItem'
import TextInput from '@allthings/elements/molecules/TextInput'
import Icon from '@allthings/elements/atoms/Icon'
import Checkmark from '@allthings/elements/molecules/Checkmark'
import ColorPalette from '@allthings/colors/lib/ColorPalette'
import Button from '@allthings/elements/molecules/Button'
import { css } from 'glamor'

class TodoItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }

  state = {
    display: 'none',
  }

  handleRemove = () => this.props.handleRemove(this.props.id)

  handleDoubleClick = () => this.props.onDoubleClick(this.props.id)

  handleEditComplete = event => this.props.doneEditting(event, this.props.id)

  handleCheckClick = event => {
    this.props.checkmarkClicked(this.props.id)
  }

  editTask = () => {
    this.props.onDoubleClick(this.props.id)
  }

  handleMouseOver = () => {
    this.setState({ display: 'inline' })
  }

  handleMouseLeave = () => {
    this.setState({ display: 'none' })
  }

  render() {
    const styles = {
      list: css({
        display: 'inline-flex'
      }),
      icons: css({
        width: '8%'
      }),
      listItem: css({
        'minHeight': '50px',
        width: '100%'
      }),
      task: css({
        display: 'inline-flex',
        width: '92%'
      }),
      text: css({
        padding: '10px 10px 15px 10px',
        width: '100%'
      }),
      remove: css({
        display: this.state.display,
        float: 'right',
        padding: '5px',
        margin: '3px',
        ':hover': { cursor: 'pointer' }
      }),
      edit: css({
        float: 'left',
        padding: '5px',
        margin: '3px',
        ':hover': {
          cursor: 'pointer'
        }
      })
    }
    const { id, children, done, doubleClicked } = this.props

    return (
      <div {...styles.list} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <ListItem {...styles.listItem}>
          <div {...styles.task}>
            <Checkmark checked={this.props.done} onClick={this.handleCheckClick} {...styles.check} />
            <div {...styles.text} onDoubleClick={this.handleDoubleClick}>
              {doubleClicked ? <TextInput id={id} name="edit" defaultValue={children} placeholder="Edit todo" onKeyPress={this.handleEditComplete}/> : <Text autoBreak={true} id={id}>{children}</Text>}
            </div>
          </div>
        <div {...styles.icons}>
          <Icon name="remove-light-filled" {...styles.remove} size="m" onClick={this.handleRemove} />
        </div>
        </ListItem>
      </div>
    )
  }
}

export default TodoItem
