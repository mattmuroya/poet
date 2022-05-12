const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const {
  resetTestData,
  closeConnection
} = require('../utils/reset');

beforeAll(resetTestData);
afterAll(closeConnection);

describe('user registration', () => {
  test('can post valid new user registration', async () => {
    const res = await api.post('/api/users/register')
      .send({
        username: 'mattmuroya',
        password: 'hunter-2'
      })
      .expect(201);
    expect(res.body.username).toBe('mattmuroya');
    expect(res.body.contacts).toHaveLength(0);
    expect(res.body.invitations).toHaveLength(0);
  });

  test('missing username returns 400', async () => {
    const res = await api.post('/api/users/register')
    .send({
      password: 'hunter-2'
    })
    .expect(400);
  expect(res.error.text).toBe('{"error":"username and password required"}')
  });

  test('missing password returns 400', async () => {
    const res = await api.post('/api/users/register')
    .send({
      username: 'mattmuroya'
    })
    .expect(400);
  expect(res.error.text).toBe('{"error":"username and password required"}')
  });

  test('duplicate username returns 409', async () => {
    const res = await api.post('/api/users/register')
    .send({
      username: 'mattmuroya',
      password: 'hunter-2'
    })
    .expect(409);
  expect(res.error.text).toBe('{"error":"username unavailable"}')
  });
});