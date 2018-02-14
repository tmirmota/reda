import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import rootReducer from './reducers/index'
import RootContainer from './containers/RootContainer'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootContainer />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
