const connection = require('../../database');

const PAGE = 1;
const LIMIT = 10;

class IncidentController {
  async index(req, res) {
    const { page = PAGE } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(LIMIT)
      .offset((page - 1) * LIMIT)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X_Total-Count', count['count(*)']);

    return res.status(200).json(incidents);
  }

  async store(req, res) {
    const { title, description, value } = req.body;

    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.status(201).json({ id });
  }

  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    // Checks if incident exists
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found!' });
    }

    // Checks if incident belongs to ong
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permited!' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

module.exports = new IncidentController();
