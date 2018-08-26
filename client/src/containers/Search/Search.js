import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchForm from '../../components/SearchForm'
import SearchResults from '../../components/SearchResults'

import { setKeyword, searchMovie } from '../../modules/actions'

import './Search.css'

export class Search extends Component {
  componentDidMount() {
    document.title = 'Movie Search Site'
  }

  render() {
    const { searchMovie, keyword, setKeyword, movies } = this.props

    return (
      <div className='search'>
        <SearchForm
          keyword={keyword}
          setKeyword={setKeyword}
          searchMovie={searchMovie}
        />
        {movies &&
          <SearchResults
            keyword={keyword}
            movies={movies}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ keyword, results }) => ({
  keyword,
  movies: results[keyword],
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setKeyword,
      searchMovie,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search)
