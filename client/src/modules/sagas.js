import { call, put, takeLatest } from 'redux-saga/effects'

import { getMoviesInfo } from './api'

import {
  searchMovieSuccess,
  searchMovieError,
} from './actions'

import { SEARCH_MOVIE } from './constants'

function* makeApiCall({
  apiFn, args, successAction, errorAction, cookies,
}) {
  try {
    const response = yield call(apiFn, args)
    const now = new Date()

    cookies.set(args.keyword, response.data, {
      expires: new Date(now.getTime() + (30 * 1000))
    })
    yield put(successAction(response.data))
  } catch (error) {
    yield put(errorAction())
  }
}

function* searchMovieSaga({ payload: { keyword, cookies } }) {
  const cachedResult = cookies.get(keyword)

  if(cachedResult) {
    yield put(searchMovieSuccess({ keyword, data: cachedResult }))
  } else {
    yield makeApiCall({
      apiFn: getMoviesInfo,
      args: { keyword },
      successAction: data => searchMovieSuccess({ keyword, data }),
      errorAction: () => searchMovieError({ keyword }),
      cookies,
    })
  }
}

export default function* searchMovieWatcher() {
  yield takeLatest(SEARCH_MOVIE, searchMovieSaga)
}
