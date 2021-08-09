import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('API routes', () => {

  const agent = request.agent(app);

  beforeAll(async () => {
    await setup(pool);
  });

  it('posts a post to the API via POST', async () => {
    const res = await agent.post('/api/V1/posts')
      .send({
        id: 1,
        name: 'agnes',
        post: 'hello i am agnes',
        fruit: 'apple'
      });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe('agnes');
    expect(res.body.post).toBe('hello i am agnes');
  });

  it('gets posts from the API via GET', async () => {
    const res = await agent.get('/api/V1/posts')
      .query({
        id: 1
      });
    expect(res.status).toBe(200);
    expect(res.body[0].id).toBe(1);
    expect(res.body[0].name).toBe('agnes');
    expect(res.body[0].post).toBe('hello i am agnes');
  }
  );
});
