import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setKeyword, searchMovie } from '../../modules/actions'

import './SearchForm.css'

const WAIT_INTERVAL = 300
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
    event.preventDefault()

    const { setKeyword, keyword } = this.props

    clearTimeout(this.timer)
    setKeyword(event.target.value)

    this.timer = setTimeout(() => {
      if (keyword.length >= 3) {
        this.handleSubmit()
      }
    }, WAIT_INTERVAL)
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER_KEY) {
        this.handleSubmit()
    }
  }

  handleSubmit() {
    const { searchMovie, keyword } = this.props
    if (this.validateInput()) {
      console.log('keyw', keyword);
      
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

        <button
          type="submit"
          className="search-form__submit"
          onClick={this.handleSubmit}
        >
          Search
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keyword: state.keyword,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setKeyword,
      searchMovie,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
