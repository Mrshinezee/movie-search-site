const request = require('supertest')
const express = require('express')
const axios = require('axios')
const flatCache = require('flat-cache')

const apiRoutes = require('./routes/api')
const app = express()

app.use(apiRoutes)
jest.mock('axios')

describe('Test the Search route', () => {
  beforeEach(() => {
    const resp = {
      data: [{
        name: 'Bob22'
      }]
    }

    axios.get.mockResolvedValue(resp)
  })

  test('It should get a list of movies', (done) => {
    flatCache.load = jest.fn().mockImplementation(() => {
      return {
        setKey: jest.fn(),
        getKey: jest.fn(),
      }
    })

    return request(app)
      .get('/api/search')
      .query({
        keyword: 'feed'
      })
      .then(response => {
        expect(flatCache.load.mock.calls.length).toBe(1)
        expect(response.statusCode).toBe(200)
        expect(axios.get.mock.calls.length).toBe(2)
        done()
      })
  })
})
