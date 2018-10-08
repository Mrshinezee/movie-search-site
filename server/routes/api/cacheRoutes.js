const express = require('express')
const flatCache = require('flat-cache')
const axios = require('axios')

const router = express.Router()
const cache = flatCache.load('moviesCache')

router.get('/refresh', async (req, res) => {
  const allContents = cache.all()

  // Cant complete this because I am unable to get all data

  res.send(allContents)
})

module.exports = router
