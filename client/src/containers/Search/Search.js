import React, { Component } from 'react'

import SearchForm from '../../components/SearchForm'
import SearchResults from '../../components/SearchResults'

import './Search.css'

export class Search extends Component {
  componentDidMount() {
    document.title = 'Movie Search Site'
  }

  render() {
    return (
      <div className='search'>
        <SearchForm />
        <SearchResults />
      </div>
    )
  }
}

export default Search
