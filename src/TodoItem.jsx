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
    display: 'inline',
    touchStart: undefined,
    icons: 0,
    iconTransition: '',
    slideLeft: -70
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

  handleTouchStart = event => {
    const touchX = event.changedTouches[0].clientX
    this.setState({ touchStart: touchX })
  }

  handleTouchMove = event => {
    const touchObj = event.changedTouches[0].clientX
    const dist = parseInt(touchObj) - this.state.touchStart
    console.log(this.state.touchStart, touchObj, dist)
    if (this.state.slideLeft < 0 && dist < -10) {
      document.getElementById(`checkmark${this.props.id}`).style.display = 'none'
      this.setState({
        slideLeft: 0,
        icons: 150,
        iconTransition: ''
      })
    } else if (dist > 5) {
      document.getElementById(`checkmark${this.props.id}`).style.display = 'flex'
      this.setState({
        slideLeft: -70,
        icons: 0,
        iconTransition: '3000ms'
      })
    }
  }

  closeIcons = event => {
    /*if (event.path[0].className == 'iconDiv' || event.path[1].className == 'iconDiv', event.path[2].className = 'iconDiv' || event.path[3].className == 'iconDiv' || event.path[4].className == 'iconDiv') {
      console.log('iconDiv exists')
    }

    console.log('from todoimte', event.path[2].className)
    console.log('from todoimte', event.path[2].div)
    console.log('from todoimte', event.path)
    */
    console.log(document.getElementsByClassName('iconDiv'))
    //document.getElementsByClassName('iconDiv')[0].style.display = 'none'
    document.getElementById(`checkmark${this.props.id}`).style.display = 'flex'
    
  }

  render() {
    const styles = {
      check: css({
        height: '10px',
        width: '30px'
      }),
      inline: css({
        overflow: 'hidden',
        display: 'inline-flex',
        width: this.state.icons,
        'transition-delay': this.state.iconTransition
      }),
      list: css({
        display: 'inline-flex'
      }),
      listItem: css({
        padding: 0,
        minHeight: '50px',
        width: '100%'
      }),
      task: css({
        display: 'inline-flex',
        width: '90%',
        height: '50.5px',
        padding: '10px 0'
      }),
      text: css({
        padding: '10px 10px 15px 10px',
        width: '100%',
        height: '50.5px'
      }),
      removeDiv: css({
        position: 'relative',
        overflow: 'hidden',
        height: '50.5px',
        width: '53.5px',
        padding: '0px 10px 15px 10px'
      }),
      editDiv: css({
        position: 'relative',
        overflow: 'hidden',
        height: '50.5px',
        width: '53.5px',
        padding: '0px 10px 15px 10px'
      }),
      remove: css({
        padding: '0px 10px 15px 10px',
        float: 'right',
        padding: '5px',
        margin: '3px',
        right: this.state.slideLeft,
        transition: 'all 300ms ease',
        ':hover': { cursor: 'pointer' }
      }),
      iconBackground: css({
        position: 'absolute',
        padding: '15px',
        float: 'right',
        right: this.state.slideLeft,
        transition: 'all 300ms ease',
        height: '35.5px',
        width: '40px'
      }),
      gray: css({
        backgroundColor: 'gray',
        transition: 'all 300ms ease',
      }),
      red: css({
        backgroundColor: 'red',
        transition: 'all 300ms ease',
      }),
      editField: css({
        padding: 0,
        ':focus': { outline: 'none' }
      })
    }
    const { id, children, done, doubleClicked } = this.props
    document.addEventListener('mouseup', this.closeIcons)

    return (
      <div {...styles.list}>
        <ListItem {...styles.listItem}>
          <div {...styles.task}>
            <Checkmark id={`checkmark${id}`} checked={this.props.done} onClick={this.handleCheckClick} {...styles.check} />
            <div {...styles.text} onDoubleClick={this.handleDoubleClick} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} >
              {doubleClicked ? <TextInput id={id} name="edit" defaultValue={children} placeholder="Edit todo" onKeyPress={this.handleEditComplete} {...styles.editField} /> : <Text autoBreak={true} id={id}>{children}</Text>}
            </div>
          </div>
          <div className="iconDiv" {...styles.inline}>
            <div {...styles.editDiv}>
              <div {...styles.iconBackground} {...styles.gray}>
                <Icon name="edit" {...styles.remove} size="m" color="white" onClick={this.handleDoubleClick} />
              </div>
            </div>
            <div {...styles.removeDiv}>
              <div {...styles.iconBackground} {...styles.red}>
                <Icon name="remove-light-filled" {...styles.remove} size="m" color="white" onClick={this.handleRemove} />
              </div>
            </div>
          </div>
        </ListItem>
      </div>
    )
  }
}

export default TodoItem
