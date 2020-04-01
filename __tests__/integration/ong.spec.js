const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const data = {
      name: 'Ong test',
      email: 'contact@test.com',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    const response = await request(app).post('/ongs').send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a new ONG without name', async () => {
    const data = {
      name: '',
      email: 'contact@test.com',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    const response = await request(app).post('/ongs').send(data);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new ONG without email or invalid email', async () => {
    const data = {
      name: 'Ong test',
      email: '',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    const data2 = {
      name: 'Ong test',
      email: 'contact',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    const response = await request(app).post('/ongs').send(data);
    const response2 = await request(app).post('/ongs').send(data2);

    expect(response.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should not be able to create a new ONG without whatsapp or  with invalid input', async () => {
    const data = {
      name: 'Ong test',
      email: 'contact1@test.com',
      whatsapp: '',
      city: 'Irecê',
      uf: 'BA',
    };

    const data2 = {
      name: 'Ong test',
      email: 'contact2@test.com',
      whatsapp: '999',
      city: 'Irecê',
      uf: 'BA',
    };

    const response = await request(app).post('/ongs').send(data);
    const response2 = await request(app).post('/ongs').send(data2);

    expect(response.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should not be able to create a new ONG without city', async () => {
    const data = {
      name: 'ONG Test',
      email: 'contact@test.com',
      whatsapp: '74999020000',
      city: '',
      uf: 'BA',
    };

    const response = await request(app).post('/ongs').send(data);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new ONG without uf or with invalid input', async () => {
    const data = {
      name: 'ONG Test',
      email: 'contact@test.com',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: '',
    };

    const data2 = {
      name: 'Ong test',
      email: 'contact2@test.com',
      whatsapp: '999020000',
      city: 'Irecê',
      uf: 'B',
    };

    const response = await request(app).post('/ongs').send(data);
    const response2 = await request(app).post('/ongs').send(data2);

    expect(response.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should be able to list all ONGs', async () => {
    const data = {
      name: 'ONG Test 1',
      email: 'contact1@test.com',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    const data2 = {
      name: 'Ong test 2',
      email: 'contact2@test.com',
      whatsapp: '74999020000',
      city: 'Irecê',
      uf: 'BA',
    };

    await request(app).post('/ongs').send(data);
    await request(app).post('/ongs').send(data2);

    const response = await request(app).get('/ongs');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
