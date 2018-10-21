const express = require('express')
const flatCache = require('flat-cache')
const axios = require('axios')
const moment = require('moment')
const getMoviesData = require('../../helpers/getMoviesData')

const router = express.Router()
const cache = flatCache.load('moviesCache')

router.get('/refresh', (req, res) => {
  const allContents = cache.all()

  res.send({ refreshing: true })

  const contentKeys = Object.keys(allContents)
  const refreshResponse = contentKeys.map(async (keyword) => {
    const data = await getMoviesData(keyword)
    const utcTime = moment.utc(new Date()).format()

    cache.setKey(key, {
      data,
      time: utcTime,
    })
    cache.save(true)
  })
})

module.exports = router
