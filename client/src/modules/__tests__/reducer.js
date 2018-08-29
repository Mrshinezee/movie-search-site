import assert from 'assert'
import reducer from '../reducers'
import * as types from '../constants'

describe('reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reducer(undefined, {}), {})
  })

  it('should handle SET_WORD', () => {
    const setAction = {
      type: types.SET_WORD,
      keyword: '123',
    }

    assert.strictEqual(reducer({}, setAction).keyword, '123')
  })

  it('should handle SEARCH_MOVIE', () => {
    const keyword = 'test'
    const searchAction = {
      type: types.SEARCH_MOVIE,
      keyword,
    }

    const results = {
      test: { data: null, isError: false, isLoading: true },
    }

    assert.deepEqual(reducer('', searchAction).results, results)
  })

  it('should handle SEARCH_MOVIE_SUCCESS', () => {
    const keyword = 'test'
    const successAction = {
      type: types.SEARCH_MOVIE_SUCCESS,
      data: {},
      keyword,
    }

    const results = {
      test: { data: {}, isError: false, isLoading: false },
    }
    assert.deepEqual(reducer({ keyword }, successAction).results, results)
  })

  it('should handle SEARCH_MOVIE_ERROR', () => {
    const keyword = 'test'

    const getAction = {
      type: types.SEARCH_MOVIE_ERROR,
      keyword,
    }

    const results = {
      test: { data: null, isError: true, isLoading: false },
    }

    assert.deepEqual(reducer({ keyword }, getAction).results, results)
  })
})
