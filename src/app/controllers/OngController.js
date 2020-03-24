const connection = require('../../database');
const generateHash = require('../../utils/generateHash');

class OngController {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.status(200).json(ongs);
  }

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = generateHash(4);

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.status(201).json({ id });
  }
}

module.exports = new OngController();
