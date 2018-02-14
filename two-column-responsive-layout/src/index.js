import "babel-polyfill"
import React, { Component } from 'react'
import { render } from "react-dom"
import { AppContainer } from "react-hot-loader"
import { Route, Switch, BrowserRouter, Link } from "react-router-dom"
import { ColorPalette } from '@allthings/colors'
import { ColumnLayout, Responsive, ThemeProvider } from "@allthings/elements"
import HorizontalRouter from "./HorizontalRouter"
import TodoGroups from "./TodoGroups"
import TodoList from "./TodoList"
import Placeholder from "./Placeholder"

const DemoTheme = {
  primary: ColorPalette.red,
  text: ColorPalette.text.primary,
  secondaryText: ColorPalette.text.primary,
  titleColor: ColorPalette.text.primary,
  contrast: ColorPalette.white,
  disabled: ColorPalette.grey,
  background: ColorPalette.background.bright
}

const ToDoGroups = ({ match }) => (
  <TodoGroups />
)

const ToDoList = ({ match }) => (
  <TodoList />
)


function renderApp() {
  render(
    <AppContainer>
      <ThemeProvider theme={DemoTheme}>
      <div>
        <Responsive mobile onlyRenderOnMatch>
              <HorizontalRouter
                routes={[
                  { path: "/", component: ToDoGroups },
                  { path: "/todos/:id", component: ToDoList }
                ]}
              />
        </Responsive>
        <Responsive desktop tablet onlyRenderOnMatch>
            <ColumnLayout>
              <HorizontalRouter
                routes={[
                  { path: '/', component: ToDoGroups },
                ]}
              />
              <Switch>
                <Route
                  path="/todos/:id"
                  exact
                  component={ToDoList}
                />
                <Route path="*" component={Placeholder} />
              </Switch>
            </ColumnLayout>
        </Responsive>
      </div>
      </ThemeProvider>
    </AppContainer>,
    document.getElementById("app")
  )
}

renderApp()

if (module.hot) {
  // module.hot.accept("./App", renderApp)
}
