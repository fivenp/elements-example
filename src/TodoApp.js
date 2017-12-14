import React, { Component } from 'react'
import { ColorPalette } from '@allthings/colors'
import Icon from '@allthings/elements/atoms/Icon'
import Inset from '@allthings/elements/atoms/Inset'
import Text from '@allthings/elements/atoms/Text'
import View from '@allthings/elements/atoms/View'
import Button from '@allthings/elements/molecules/Button'
import Card from '@allthings/elements/molecules/Card'
import TextInput from '@allthings/elements/molecules/TextInput'
import GroupedCardList from '@allthings/elements/organisms/CardList/GroupedCardList'
import TitleBar from '@allthings/elements/organisms/TitleBar'
import ResourceProvider from '@allthings/elements/behaviour/ResourceProvider'
import ThemeProvider from '@allthings/elements/behaviour/ThemeProvider'
import TodoItem from './TodoItem'
import { css } from 'glamor'

const styles = {
	create: css({
		':hover': { cursor: 'pointer '}
	}),
	inset: css({
		width: '93%'
	}),
	new: css({
		padding: 0,
		width: '100%',
		display: 'flex'
	}),
	iconStyle: css({
		display: 'inline-block',
		marginRight: '10px',
		position: 'absolute'
	}),
	titleBar: css({
		padding: '10px 15px 10px 0px'
	}),
	titleText: css({
		display: 'inline-block',
		padding: '0 35px',
		position: 'relative'
	}),
	buttonDiv: css({
		textAlign: 'center'
	}),
	button: css({
		margin: '3px'
	}),
	textInput: css({
		display: 'inline-block',
		width: '100%',
		':focus': { outline: 'none' }
	}),
	add: css({
		display: 'inline-block',
		float: 'right',
		margin: '15px 10px 15px 0px'
	})
}

const DemoTheme = {
	primary: ColorPalette.red,
	text: ColorPalette.text.primary,
	secondaryText: ColorPalette.text.primary,
	titleColor: ColorPalette.text.primary,
	contrast: ColorPalette.white,
	disabled: ColorPalette.grey,
	background: ColorPalette.background.bright
}

class App extends Component {
	state = {
		todos: [
			{ id: 0, text: 'Search for cocktail recipes for the party', done: false, doubleClicked: false, checkmark: 'flex', iconOpen: false },
			{ id: 1, text: 'Create nice invitation cards', done: false, doubleClicked: false, checkmark: 'flex', iconOpen: false },
			{ id: 2, text: 'Ask some people to bring some finger food', done: false, doubleClicked: false, checkmark: 'flex', iconOpen: false }
		],
		filter: 'all',
		textDisable: true
	}

	componentDidMount = () => {
		document.addEventListener('touchend', this.finishEdit)
		document.addEventListener('mouseup', this.finishEdit)
	}

	handleRemove = id => {
		console.log('id is', this)
		const newTodo = this.state.todos.slice()
		newTodo.splice(id, 1)
		this.setState({ todos: newTodo })
	}

	handleDoubleClick = id => {
		const newTodo = this.state.todos.slice()
		newTodo[id].doubleClicked = true
		this.setState({ todos: newTodo })
	}

	handleSliding = (id, type) => {
		const newTodo = this.state.todos.slice()
		if (type === 'open') {
			newTodo[id].iconOpen = true
		} else if (type === 'close') {
			newTodo[id].iconOpen = false
		}
		this.setState({ todos: newTodo })
	}

	checkmarkClicked = id => {
		const newTodo = this.state.todos.slice()
		newTodo[id].done = !this.state.todos[id].done
		this.setState({
			todos: newTodo
		})
	}

	handleKeyPress = event => {
		const text = event.target.value
		if ((event.key === 'Enter' || event.which == 13) && text) {
			this.addTodo()
		} else {
			//dont access dom; use 'ref'> put it in state
			const textExists = document.getElementById('new').value
			if (textExists && this.state.textDisable) {
				this.setState({ textDisable: false })
			} else if(!textExists && !this.state.textDisable) {
				this.setState({ textDisable: true })
			}
		}
	}

	addTodo = event => {
		const text = document.getElementById('new').value
		const newTodo = this.state.todos.slice()
		const item = {
			id: newTodo.length,
			text,
			done: false,
			doubleClicked: false,
			checkmark: 'flex',
			iconOpen: false
		}
		newTodo.push(item)
		this.setState({
			todos: newTodo,
			textDisable: true
		})
		//dont set value
		document.getElementById('new').value = ''
		document.getElementById('new').blur()
	}

	changeFilter = event => {
		const className = event.target.className
		this.setState({ filter: className })
	}

	focusInput = event => {
		document.getElementById('new').focus()
	}

	doneEditting = (event, id) => {
		const text = event.target.value
		if (event.key === 'Enter' && text) {
			const newTodo = this.state.todos.slice()
			newTodo[id].doubleClicked = false
			newTodo[id].text = text
			newTodo[id].checkmark = 'flex'
			newTodo[id].iconOpen = false

			this.setState({ todos: newTodo })
		}
	}

	finishEdit = event => {
		console.log('finish edit triggered', this.state.todos)
		const oldTodo = this.state.todos.slice()
		const newTodo = oldTodo.map((todo, index) => {
			const { doubleClicked, iconOpen } = todo
			if (doubleClicked && (index.toString() !== event.srcElement.id)) {
				todo.doubleClicked = false
				todo.checkmark = 'flex'
				todo.iconOpen = false
				todo.text = document.getElementById(index).value
				return todo
			} else if (iconOpen && (index.toString() !== event.srcElement.id)) {
				todo.doubleClicked = false
				todo.checkmark = 'flex'
				todo.iconOpen = false
				return todo
			} else if (doubleClicked && (index.toString() === event.srcElement.id)) {
				return todo
			} else {
				return todo
			}
		})
		this.setState({ todos: newTodo })
	}

	render() {

		const { todos, filter, textDisable } = this.state

		const incomplete = todos.reduce((accumulator, currentValue) => {
			if (currentValue.done === false) {
				accumulator++
			}
			return accumulator
		}, 0)

		const incompleteNum = incomplete > 0 ? `Incomplete (${incomplete})` : 'Incomplete'
		const opacity = 'rgba(232, 76, 61, 0.5)'

		return (
			<div className="App">
				<ResourceProvider>
					<ThemeProvider theme={DemoTheme}>
						<View>
							<TitleBar {...styles.titleBar}>
								<Inset {...styles.inset}>
									<Icon name="book-open" size="m" color="white" {...styles.iconStyle} />
									<Text color="contrast" {...styles.titleText}>My Todos</Text>
								</Inset>
								<Icon name="plus-light" size="m" color="#FFFFFF" onClick={this.focusInput} {...styles.create} />
							</TitleBar>
							<Card>
								<div {...styles.new}> 
									<div {...styles.textInput}>
										<TextInput id="new" name="new" placeholder="Add new" onKeyUp={this.handleKeyPress} {...styles.textInput} />
									</div>
									<Button onClick={this.addTodo} disabled={textDisable} {...styles.add}>add</Button>
								</div>
								<div {...styles.buttonDiv}>
									<Button className="all" id="all-button" onClick={this.changeFilter} backgroundColor={filter !== "all" ? opacity : ''} {...styles.button}><span className="all">All</span></Button>
									<Button className="incomplete" onClick={this.changeFilter} backgroundColor={filter !== "incomplete" ? opacity : ''} {...styles.button}><span className="incomplete">{incompleteNum}</span></Button>
									<Button className="completed" onClick={this.changeFilter} backgroundColor={filter !== "completed" ? opacity : ''} {...styles.button}><span className="completed">Completed</span></Button>
								</div>
								<GroupedCardList>
									{todos.map((todo, index) => {
										const { done, checkmark, iconOpen, doubleClicked, text } = todo
										const thisTodoItem = (
											<TodoItem
												handleRemove={this.handleRemove}
												id={index}
												done={done}
												checkmarkDisplay={checkmark}
												iconOpen={iconOpen}
												doubleClicked={doubleClicked}
												key={'checkbox' + index}
												onDoubleClick={this.handleDoubleClick}
												onSlideLeft={this.handleSliding}
												doneEditting={this.doneEditting}
												checkmarkClicked={this.checkmarkClicked}
											>
												{text}
											</TodoItem>
										)
										if (filter === "incomplete" && done === false) {
											return thisTodoItem
										} else if (filter === "completed" && done === true) {
											return thisTodoItem
										} else if (filter === "all") {
											return thisTodoItem
										}
									})}
								</GroupedCardList>
							</Card>
						</View>
					</ThemeProvider>
				</ResourceProvider>
			</div>
		)
	}
}

export default App
