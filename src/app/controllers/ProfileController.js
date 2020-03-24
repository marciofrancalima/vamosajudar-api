const connection = require('../../database');

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    // Checks if the ong_id was entered
    if (!ong_id) {
      return res.status(400).json({ error: 'ONG id not informed' });
    }

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return res.status(200).json(incidents);
  }
}

module.exports = new ProfileController();
