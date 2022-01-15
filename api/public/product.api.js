const express = require('express');
const router = express.Router();
const mobileService = require('../../services/mobileService');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const mobile_id = parseInt(id) || null;
  if (!mobile_id) {
    res.status(404);
  }
  const mobile = (await mobileService.getMobileById(mobile_id))[0];
  res.json(mobile);
});
router.post('/', async (req, res) => {
  const { list } = req.body;
  const mbs = JSON.parse(list || '[]');
  const response = [];
  const getAllData = async () => {
    for (let id of mbs) {
      const mb = (await mobileService.getMobileById(id))[0];
      response.push(mb.toJSON());
    }
  };

  await getAllData()
  res.json(response);

})
module.exports = router;
