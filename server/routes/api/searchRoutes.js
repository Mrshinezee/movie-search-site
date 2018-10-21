const express = require('express')
const flatCache = require('flat-cache')
const moment = require('moment')
const axios = require('axios')
const getMoviesData = require('../../helpers/getMoviesData')

const router = express.Router()
const cache = flatCache.load('moviesCache')

router.get('/', async (req, res) => {
  const { keyword } = req.query
  const key = `${keyword}`
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
      cache.save(true)
    }
  } else {
    const data = await getMoviesData(keyword)

    res.send(data)

    cache.setKey(key, {
      data,
      time: utcTime,
    })
    cache.save(true)
  }
})

module.exports = router
