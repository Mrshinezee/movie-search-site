import {
  SET_WORD,
  SEARCH_MOVIE,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_ERROR,
} from './constants'

const getDerivedState = (
  state, keyword, isLoading, isError, data,
) => Object.assign({}, state, {
  results: Object.assign({}, state.results, {
    [keyword]: {
      isLoading,
      isError,
      data,
    },
  }),
})

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_WORD:
      return Object.assign({}, state, { keyword: action.keyword })
    case SEARCH_MOVIE:
      return getDerivedState(state, action.keyword, true, false, null)
    case SEARCH_MOVIE_SUCCESS:
      return getDerivedState(state, action.keyword, false, false, action.data)
    case SEARCH_MOVIE_ERROR:
      return getDerivedState(state, action.keyword, false, true, null)
    default:
      return state
  }
}

export default reducer
