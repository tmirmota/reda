import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import rootReducer from './reducers/index'
import RootContainer from './containers/RootContainer'

const history = createHistory()

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, routerMiddleware(history)),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
