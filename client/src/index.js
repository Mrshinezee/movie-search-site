import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './modules/store'
import Search from './containers/Search'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Search />
  </Provider>, document.getElementById('root'),
)
