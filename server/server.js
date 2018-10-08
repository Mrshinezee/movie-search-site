const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const apiRoutes = require('./routes/api')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(apiRoutes)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')))

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))
