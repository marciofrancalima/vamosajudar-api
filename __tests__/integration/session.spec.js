const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database');

describe('SESSION', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new session', async () => {
    const data = {
      name: 'Ong test',
      email: 'contato@test.com',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    const ong = await request(app).post('/ongs').send(data);

    const response = await request(app)
      .post('/sessions')
      .send({ id: ong.body.id });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name');
  });

  it('should not be able to create a new session without id', async () => {
    const data = {
      name: 'Ong test',
      email: 'contato@test.com',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    await request(app).post('/ongs').send(data);

    const response = await request(app).post('/sessions').send({ id: '' });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new session with invalid id', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ id: '123456' });

    expect(response.status).toBe(401);
  });
});
