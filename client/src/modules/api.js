import axios from 'axios'

export const getMoviesInfo = ({ keyword }) => axios.get('/api/search', {  // eslint-disable-line
  params: {
    keyword,
  },
})
