import * as mocha from 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import app from '../src/App'

chai.use(chaiHttp)
const expect = chai.expect

describe('GET api/v1/users', () => {
  it('responds with message status 200', () => {
    return chai.request(app)
  })
  
})

describe('GET api/v1/users/:id', () => {
  it('responds with message status 200', () => {
    return chai.request(app)
  })
})

describe('POST api/v1/users/', () => {
  it('responds with message status 200', () => {
    return chai.request(app)
  })
})