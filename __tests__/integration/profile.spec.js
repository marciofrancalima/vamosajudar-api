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

describe('PROFILE', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to list all (3 cases) specific ong incidents', async () => {
    const ongId = await createOng();

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);
    await createIncident('Case 2', 'Help us solve this problem', 20, ongId);
    await createIncident('Case 3', 'Help us solve this problem', 30, ongId);

    const response = await request(app)
      .get('/profile')
      .set('Authorization', ongId);

    expect(response.body).toHaveLength(3);
  });

  it('should be able to list all (3 cases) specific ong incidents with page number', async () => {
    const ongId = await createOng();

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);
    await createIncident('Case 2', 'Help us solve this problem', 20, ongId);
    await createIncident('Case 3', 'Help us solve this problem', 30, ongId);

    const response = await request(app)
      .get('/profile')
      .query({ page: 1 })
      .set('Authorization', ongId);

    expect(response.body).toHaveLength(3);
  });

  it('should be able to list all (3 cases) specific ong incidents with invalid page number', async () => {
    const ongId = await createOng();

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);
    await createIncident('Case 2', 'Help us solve this problem', 20, ongId);
    await createIncident('Case 3', 'Help us solve this problem', 30, ongId);

    const response = await request(app)
      .get('/profile')
      .query({ page: 'test' })
      .set('Authorization', ongId);

    expect(response.status).toBe(400);
  });

  it('should be able to return empty list', async () => {
    const ongId = await createOng();

    const response = await request(app)
      .get('/profile')
      .set('Authorization', ongId);

    expect(response.body).toHaveLength(0);
  });

  it('should not be able to list specific ong incidents without entering id in the request header', async () => {
    const ongId = await createOng();

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);

    const response = await request(app).get('/profile');

    expect(response.status).toBe(400);
  });

  it('should not be able to list ong incidents from other ongs', async () => {
    const ongId = await createOng();

    const otherOngId = await createOng(
      'Ong test 2',
      'contact2@test.com',
      '74999020000',
      'Irecê',
      'BA'
    );

    await createIncident('Case 1', 'Help us solve this problem', 10, ongId);
    await createIncident('Case 2', 'Help us solve this problem', 20, ongId);

    const response = await request(app)
      .get('/profile')
      .set('Authorization', otherOngId);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
