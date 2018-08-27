const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const axios = require('axios')
const flatCache = require('flat-cache')
const moment = require('moment')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const cache = flatCache.load('moviesCache')

const getRequestPromise = (s, page) => axios.get('http://www.omdbapi.com/', {
  params: {
    s,
    apikey: process.env.OMDB_KEY,
    page,
  },
})

const getMoviesData = async (keyword) => {
  const firstRequestPromise = getRequestPromise(keyword, 1)
  const secondRequestPromise = getRequestPromise(keyword, 2)

  const [
    firstResponse,
    secondResponse,
  ] = await Promise.all([ firstRequestPromise, secondRequestPromise ])

  let responseData = []

  if (firstResponse.data.Response === 'True') {
    responseData = responseData
      .concat(firstResponse.data.Search)
  }
  if (secondResponse.data.Response === 'True') {
    responseData = responseData
      .concat(secondResponse.data.Search)
  }

  return responseData
}

// API calls
app.get('/api/search', async (req, res) => {
  const { keyword } = req.query
  const key = `__express__${keyword}`
  const cacheContent = cache.getKey(key)
  const utcTime = moment.utc(new Date()).format()

  if (cacheContent) {
    res.send(cacheContent.data)

    const cacheTime = cacheContent.time
    const diff = moment(utcTime).diff(cacheTime, 'minutes')

    if (diff > 1) {
      const data = await getMoviesData(keyword)

      cache.setKey(key, {
        data,
        time: utcTime,
      })
      cache.save()
    }
  } else {
    const data = await getMoviesData(keyword)

    res.send(data)

    cache.setKey(key, {
      data,
      time: utcTime,
    })
    cache.save()
  }
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')))

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))
