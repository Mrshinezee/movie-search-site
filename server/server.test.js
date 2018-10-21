const apiRoutes = require('./routes/api')
const express = require('express')
const moxios = require('moxios')
const request = require('supertest')

const initApiRoutes = () => {
  const app = express()
  app.use(apiRoutes())
  return app
}

describe('GET /api/search?keyword=foo', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('It should fetch foo from OMDB', async () => {
    moxios.stubRequest(/api.github.com\/users/, {
      status: 200,
      response: {
        blog: 'https://codewithhugo.com',
        location: 'London',
        bio: 'Developer, JavaScript',
        public_repos: 39,
      }
    })
    const app = initApiRoutes()
    await request(app).get('/hugo')
    expect(moxios.requests.mostRecent().url).toBe('https://api.github.com/users/HugoDF')
  })
  test('It should 200 and return a transformed version of GitHub response', async () => {
    moxios.stubRequest(/api.github.com\/users/, {
      status: 200,
      response: {
        blog: 'https://codewithhugo.com',
        location: 'London',
        bio: 'Developer, JavaScript',
        public_repos: 39,
      }
    })
    const app = initApiRoutes()
    const res = await request(app).get('/hugo')
    expect(res.body).toEqual({
      blog: 'https://codewithhugo.com',
        location: 'London',
        bio: 'Developer, JavaScript',
        publicRepos: 39,
    })
  })
})
