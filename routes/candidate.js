const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate.js');

router.get('/', candidateController.getAll);
router.get('/:id', candidateController.getById);
router.post('/', candidateController.createCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
