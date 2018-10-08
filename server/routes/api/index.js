const express = require('express')
const router = express.Router()
const cacheRoutes = require('./cacheRoutes')
const searchRoutes = require('./searchRoutes')

router.use('/api/cache', cacheRoutes)
router.use('/api/search', searchRoutes)

module.exports = router
