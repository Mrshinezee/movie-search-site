import axios from 'axios'

export const getMoviesInfo = ({ keyword, page }) => axios.get('/api/search', {  // eslint-disable-line
  params: {
    keyword,
    page,
  },
})
