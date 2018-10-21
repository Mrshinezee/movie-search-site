import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withCookies } from 'react-cookie';
import { bindActionCreators } from 'redux'

import SearchForm from '../../components/SearchForm'
import SearchResults from '../../components/SearchResults'

import { setKeyword, searchMovie } from '../../modules/actions'

import './Search.css'

export class Search extends Component {
  searchMovie = () => {
    const { searchMovie, keyword, movies, cookies } = this.props

    if (!movies) {
      searchMovie({
        keyword,
        cookies
      })
    }
  }

  render() {
    const { keyword, setKeyword, movies } = this.props

    return (
      <div className='search'>
        <div className='search__title'>
          <h2>Movie Search Site</h2>
        </div>
        <SearchForm
          keyword={keyword}
          setKeyword={setKeyword}
          searchMovie={this.searchMovie}
        />
        {movies
          && (
          <SearchResults
            keyword={keyword}
            movies={movies}
          />
          )
        }
      </div>
    )
  }
}

export const mapStateToProps = ({ keyword, results }) => ({
  keyword,
  movies: results[keyword],
})

export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setKeyword,
    searchMovie,
  },
  dispatch,
)

Search.propTypes = {
  setKeyword: PropTypes.func.isRequired,
  searchMovie: PropTypes.func.isRequired,
  movies: PropTypes.object,
  keyword: PropTypes.string,
}

const enhance = compose(
  withCookies,
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(Search)
