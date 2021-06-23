const request = require('supertest');
const { app } = require('../app')

describe('Mosaic Api', () => {


  describe('Test GET /', () => {

    const successResponse = {
      success: true
    }

    it('should respond with 200 success', (done) => {
      const response = request(app)
        .get('/api/ping')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })
  describe('Test GET /api/posts', () => {
    it('should return with an error of 400', () => {
      request(app)
        .get('/api/posts')
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('should return with an array of posts', async () => {
      request(app)
        .get('/api/posts?tag=tech,history')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.posts).toBeDefined();

        })
    })

  })
})