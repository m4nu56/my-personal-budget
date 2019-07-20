const request = require('supertest');
const app = require('../app'); // our Node application

describe('Movements', () => {
    it('succeeds list of movements', async () => {
        const response = await request(app)
            .get(`/movements`)
            .expect(200);
        console.log(response.body);
        let body = response.body;
        expect(body.length).toBeGreaterThan(1);
    });
    it('creates a new movement', async () => {
        const movement = {
            date: '2019-07-02',
            amount: 350,
            label: 'PRAGUE2019',
            category: 'Coucou'
        };
        await post(`/movements`, movement).expect(201);
    });
});

// a helper function to make a POST request
function post(url, body) {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:3000');
    return httpRequest;
}
