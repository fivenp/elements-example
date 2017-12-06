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
    touchStart: undefined,
    icons: 0,
    iconTransition: '',
    slideLeft: -70,
    checkmark: 'flex',
    iconOpen: false,
  }

  componentDidMount = () => {
    //document.addEventListener('touchstart', this.clickOutside)
    //document.addEventListener('mousedown', this.clickOutside)
    //this.setState({ checkmark: 'flex' })
  }

  handleRemove = () => {
    this.closeIcons('')
    this.props.handleRemove(this.props.id) 
  }

  handleDoubleClick = event => {
    this.setState({
      checkmark: 'none',
      slideLeft: -70,
      icons: 0,
      iconTransition: ''
    })
    this.props.onDoubleClick(this.props.id)
  }

  handleEditComplete = event => this.props.doneEditting(event, this.props.id)

  handleCheckClick = () => this.props.checkmarkClicked(this.props.id)

  editTask = () => this.props.onDoubleClick(this.props.id)

  handleMouseOver = () => this.setState({ display: 'inline' })

  handleMouseLeave = () => this.setState({ display: 'none' })

  handleTouchStart = event => {
    const touchX = event.changedTouches[0].clientX
    this.setState({ touchStart: touchX })
  }

  openIcons = () => {
    this.setState({
      checkmark: 'none',
      slideLeft: 0,
      icons: 150,
      iconTransition: '',
      iconOpen: true
    })
  }

  closeIcons = (transition) => {
    this.setState({
      checkmark: 'flex',
      slideLeft: -70,
      icons: 0,
      iconTransition: transition || '',
      iconOpen: false
    })
  }

  clickOutside = event => {
    console.log('clicked yes', event)
    console.log('heyyy', event.srcElement.id, 'yes', this.props.id.toString() )
    if (event.srcElement.id !== this.props.id.toString()) {
      this.closeIcons()
    } else if (event.srcElement.id === this.props.id.toString()) {
      console.log('same!')
    }
  }

  handleTouchMove = event => {
    const { slideLeft, touchStart } = this.state
    const touchObj = event.changedTouches[0].clientX
    const dist = parseInt(touchObj) - touchStart
    console.log(touchStart, touchObj, dist)
    if (slideLeft < 0 && dist < -10) {
      this.openIcons()
    } else if (dist > 5) {
      this.closeIcons('200ms')
    }
  }

  render() {
    const { id, children, done, doubleClicked } = this.props
    const { icons, iconTransition, slideLeft, checkmark, iconOpen } = this.state


    console.log('doubleClicked is', doubleClicked, 'iconopen is', iconOpen)
    const checkmarkYes = (!iconOpen && !doubleClicked) ? 'flex' : (!doubleClicked ? 'flex' : checkmark )
    console.log('checkmark state', this.props.checkmarkDisplay)

    const styles = {
      check: css({
        height: '40px',
        width: '40px',
        display: checkmarkYes
      }),
      inline: css({
        overflow: 'hidden',
        display: 'inline-flex',
        width: icons,
        transitionDelay: iconTransition
      }),
      list: css({
        display: 'inline-flex'
      }),
      listItem: css({
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
        right: slideLeft,
        transition: 'all 300ms ease',
        ':hover': { cursor: 'pointer' }
      }),
      iconBackground: css({
        position: 'absolute',
        padding: '15px',
        float: 'right',
        right: slideLeft,
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

    return (
      <div {...styles.list}>
        <ListItem {...styles.listItem}>
          <div {...styles.task}>
            <Checkmark id={`checkmark${id}`} checked={done} onClick={this.handleCheckClick} {...styles.check} />
            <div {...styles.text} onDoubleClick={this.handleDoubleClick} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} >
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