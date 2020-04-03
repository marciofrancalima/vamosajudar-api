const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database');

async function createOng(
  name = 'Ong test',
  email = 'contact@test.com',
  whatsapp = '74999020000',
  city = 'Irecê',
  uf = 'BA'
) {
  const [id] = await connection('ongs').insert({
    name,
    email,
    whatsapp,
    city,
    uf,
  });

  return id;
}

async function createIncident(title, description, value, ongId) {
  const [id] = await connection('incidents').insert({
    title,
    description,
    value,
    ong_id: ongId,
  });

  return id;
}

describe('INCIDENT', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new incident', async () => {
    const ongId = await createOng();

    const data = {
      title: 'Case 1',
      description: 'Help us solve this problem',
      value: 10,
    };

    const response = await request(app)
      .post('/incidents')
      .send(data)
      .set('Authorization', ongId);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a new incident without entering id in the request header', async () => {
    const data = {
      title: 'Case 1',
      description: 'Help us solve this problem',
      value: 10,
    };

    const response = await request(app).post('/incidents').send(data);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new incident without title', async () => {
    const ongId = await createOng();

    const data = {
      title: '',
      description: 'Help us solve this problem',
      value: 10,
    };

    const response = await request(app)
      .post('/incidents')
      .send(data)
      .set('Authorization', ongId);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new incident without description', async () => {
    const ongId = await createOng();

    const data = {
      title: 'Case 1',
      description: '',
      value: 10,
    };

    const response = await request(app)
      .post('/incidents')
      .send(data)
      .set('Authorization', ongId);

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new incident without value or invalid value', async () => {
    const ongId = await createOng();

    const data = {
      title: 'Case 1',
      description: 'Help us solve this problem',
    };

    const data2 = {
      title: 'Case 1',
      description: 'Help us solve this problem',
      value: 'fff',
    };

    const response = await request(app)
      .post('/incidents')
      .send(data)
      .set('Authorization', ongId);

    const response2 = await request(app)
      .post('/incidents')
      .send(data2)
      .set('Authorization', ongId);

    expect(response.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should be able to list all (3 cases) incidents', async () => {
    const ongId = await createOng();
    const otherOngId = await createOng();

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);
    await createIncident('Case 2', 'Help us solve this problem', 20, ongId);
    await createIncident(
      'Case 3',
      'Help us solve this problem',
      30,
      otherOngId
    );

    const response = await request(app).get('/incidents');

    const count = Number(response.header['x_total-count']);

    expect(response.status).toBe(200);
    expect(count).toBe(3);
  });

  it('should be able to list incidents with page number', async () => {
    const ongId = await createOng();

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);
    await createIncident('Case 2', 'Help us solve this problem', 20, ongId);
    await createIncident('Case 3', 'Help us solve this problem', 30, ongId);

    const response = await request(app).get('/incidents').query({ page: 1 });

    expect(response.status).toBe(200);
  });

  it('should not be able to list incidents with an invalid page number', async () => {
    const ongId = await createOng();

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);
    await createIncident('Case 2', 'Help us solve this problem', 20, ongId);
    await createIncident('Case 3', 'Help us solve this problem', 30, ongId);

    const response = await request(app)
      .get('/incidents')
      .query({ page: 'test' });

    expect(response.status).toBe(400);
  });

  it('should be able to return empty list', async () => {
    const response = await request(app).get('/incidents');

    const count = Number(response.header['x_total-count']);

    expect(response.status).toBe(200);
    expect(count).toBe(0);
  });

  it('should be able to delete an incident by id', async () => {
    const ongId = await createOng();

    const incidentId = await createIncident(
      'Case 1',
      'Help us solve this problem',
      10,
      ongId
    );

    const response = await request(app)
      .delete(`/incidents/${incidentId}`)
      .set('Authorization', ongId);

    expect(response.status).toBe(204);
  });

  it('should not be able to delete an incident that belongs to another ong', async () => {
    const ongId = await createOng();

    const otherOngId = await createOng(
      'Ong Test 2',
      'contact2@test.com',
      '74999020000',
      'Irecê',
      'BA'
    );

    const incidentId = await createIncident(
      'Case 1',
      'Help us solve this problem',
      10,
      ongId
    );

    const response = await request(app)
      .delete(`/incidents/${incidentId}`)
      .set('Authorization', otherOngId);

    expect(response.status).toBe(401);
  });
});
