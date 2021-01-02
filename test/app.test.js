const supertest = require('supertest');
const {expect} = require('chai');
const app = require('../app');

describe('GET /apps', () => {
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'WRONG'})
            .expect(400, 'Sort must be rating or app.')
    })

    it('should be 400 if genres is wrong', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'WRONG'})
            .expect(400, 'Genres must be Action, puzzle, strategy, casual, arcade, or card.')
    })

    it('returns array of app objects', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'Rating', genres: 'Action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
            })
    })
})