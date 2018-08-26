import {
  SEARCH_MOVIE,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_ERROR,
  SET_WORD,
} from './constants'

export const setKeyword = keyword => ({
  type: SET_WORD,
  keyword,
})

export const searchMovie = (keyword, page = 1) => ({
  type: SEARCH_MOVIE,
  keyword,
  page,
})

export const searchMovieSuccess = ({ data, keyword }) => ({
  type: SEARCH_MOVIE_SUCCESS,
  data,
  keyword,
})

export const searchMovieError = ({ keyword }) => ({
  type: SEARCH_MOVIE_ERROR,
  keyword,
})
