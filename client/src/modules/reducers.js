import { SEARCH_WORD, ADD_WORD } from './constants'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_WORD:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case ADD_WORD:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

export default reducer
