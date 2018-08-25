import { call, put, takeLatest } from 'redux-saga/effects'

import { getMoviesInfo } from './api'

import {
  searchMovieSuccess,
  searchMovieError,
} from './actions'

import { SEARCH_MOVIE } from './constants'

function* makeApiCall({
  apiFn, args, successAction, errorAction,
}) {
  try {
    const response = yield call(apiFn, args)
    yield put(successAction(response.body))
  } catch (error) {
    yield put(errorAction())
  }
}

function* searchMovieSaga({ keyword }) {
  console.log('keyword', keyword)

  yield makeApiCall({
    apiFn: getMoviesInfo,
    args: { keyword },
    successAction: data => searchMovieSuccess({ keyword, data }),
    errorAction: () => searchMovieError({ keyword }),
  })
}

export default function* searchMovieWatcher() {
  yield takeLatest(SEARCH_MOVIE, searchMovieSaga)
}
