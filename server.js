const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const axios = require('axios')
const flatCache = require('flat-cache')
const moment = require('moment')

// const Logger = require('winston')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
let cache = flatCache.load('productsCache')

// API calls
app.get('/api/search', async (req, res) => {
  const { page, keyword } = req.query
  const key = `__express__${page}-${keyword}`
  const cacheContent = cache.getKey(key)
  const utcTime = moment.utc(new Date()).format()

  console.log(utcTime, cacheContent)

  if (cacheContent) {
    console.log('cache found', cacheContent)
    res.send(cacheContent)
  } else {
    const request = await axios.get('http://www.omdbapi.com/', {
      params: {
        s: req.query.keyword,
        apikey: process.env.OMDB_KEY,
        p: 2,
      },
    })
    res.send(request.data)
    cache.setKey(key, Object.assign({}, request.data, { time: utcTime }))
    cache.save()
  }
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))
