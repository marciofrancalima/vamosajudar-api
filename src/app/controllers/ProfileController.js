const connection = require('../../database');

const PAGE = 1;
const LIMIT = 10;

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    // Checks if the ong_id was entered
    if (!ong_id) {
      return res.status(400).json({ error: 'ONG id not informed' });
    }

    const { page = PAGE } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .limit(LIMIT)
      .offset((page - 1) * LIMIT)
      .where('ong_id', ong_id)
      .select(['*']);

    res.header('X_Total-Count', count['count(*)']);

    return res.status(200).json(incidents);
  }
}

module.exports = new ProfileController();
