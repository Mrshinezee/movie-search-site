import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SearchForm.css'

const WAIT_INTERVAL = 300
const ENTER_KEY = 13

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentWillMount() {
    this.timer = null
  }

  handleTextChange(event) {
    const { setKeyword, searchMovie } = this.props

    clearTimeout(this.timer)
    setKeyword(event.target.value)

    if (event.target.value.length >= 3) {
      this.timer = setTimeout(() => {
        searchMovie()
      }, WAIT_INTERVAL)
    }
  }

  handleKeyDown(event) {
    const { searchMovie } = this.props
  
    if (event.keyCode === ENTER_KEY && event.target.value.length >= 3) {
      searchMovie()
    }
  }

  render() {
    const { keyword } = this.props

    return (
      <div className='search-form'>
        <input
          type='search'
          name='keyword'
          value={keyword}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyDown}
          placeholder='Keyword'
          className='search-form__field'
        />
      </div>
    )
  }
}

SearchForm.propTypes = {
  setKeyword: PropTypes.func.isRequired,
  searchMovie: PropTypes.func.isRequired,
  keyword: PropTypes.string,
}

export default SearchForm
