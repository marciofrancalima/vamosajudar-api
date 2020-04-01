const connection = require('../../database');

class SessionController {
  async store(req, res) {
    const { id } = req.body;

    const ong = await connection('ongs').where('id', id).select('name').first();

    // Checks if the ong exists
    if (!ong) {
      return res
        .status(401)
        .json({ error: 'ONG not registered or invalid ID.' });
    }

    return res.status(201).json(ong);
  }
}

module.exports = new SessionController();
