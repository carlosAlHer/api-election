const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voter.js');

router.get('/', voterController.getAll);
router.get('/:id', voterController.getById);
router.post('/', voterController.createVoter);
router.delete('/:id', voterController.deleteVoter);

module.exports = router;
