import {
  SET_WORD,
  SEARCH_MOVIE,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_ERROR
} from './constants'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_WORD:
      return Object.assign({}, state, { keyword: action.keyword })
    case SEARCH_MOVIE:
      return Object.assign({}, state, {
        results: Object.assign({}, state.results, {
          [action.keyword]: {
            isLoading: true,
            isError: false,
            data: null,
          },
        })
      })
    case SEARCH_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        results: Object.assign({}, state.results, {
          [action.keyword]: {
            isLoading: false,
            isError: false,
            data: action.data,
          },
        })
      })
    case SEARCH_MOVIE_ERROR:
      return Object.assign({}, state, {
        results: Object.assign({}, state.results, {
          [action.keyword]: {
            isLoading: false,
            isError: true,
            data: null,
          },
        })
      })
    default:
      return state
  }
}

export default reducer
