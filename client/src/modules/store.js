import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import rootReducer from './reducers'

const initialState = {
  keyword: '',
  results: {},
}

// ======================================================
// Middleware Configuration
// ======================================================
const sagaMiddleware = createSagaMiddleware()
const middleware = [ sagaMiddleware ]

// ======================================================
// Store Enhancers
// ======================================================

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
}

// ======================================================
// Store Instantiation and HMR Setup
// ======================================================
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
)

sagaMiddleware.run(rootSaga)

store.asyncReducers = {}

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const reducers = require('./reducers').default; // eslint-disable-line
    store.replaceReducer(reducers(store.asyncReducers))
  })
}

export default store


export const createAction = type => store.dispatch({ type })
