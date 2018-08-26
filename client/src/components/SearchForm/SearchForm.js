import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SearchForm.css'

const WAIT_INTERVAL = 3000
const ENTER_KEY = 13

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentWillMount() {
    this.timer = null
  }

  handleTextChange(event) {
    const { setKeyword, keyword } = this.props

    clearTimeout(this.timer)
    setKeyword(event.target.value)
    
    if (event.target.value.length >= 3) {
      this.timer = setTimeout(() => {
        this.handleSubmit()
      }, WAIT_INTERVAL)
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER_KEY && event.target.value.length >= 3) {
        this.handleSubmit()
    }
  }

  handleSubmit() {
    const { searchMovie, keyword } = this.props
    if (this.validateInput()) {
      searchMovie(keyword)
    }
  }

  validateInput() {
    let isValid = true

    return isValid
  }

  render() {
    const { keyword } = this.props
    
    return (
      <div className="search-form">
        <input 
          type="search"
          name="keyword"
          value={keyword}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Keyword"
          className="search-form__field"
        />
      </div>
    )
  }
}

export default SearchForm
