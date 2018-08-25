import { SET_WORD } from './constants'

const reducer = (state = {}, action) => {
  console.log('state...', state)
  switch (action.type) {
    case SET_WORD:
      return Object.assign({}, state, { keyword: action.keyword })
    default:
      return state
  }
}

export default reducer
