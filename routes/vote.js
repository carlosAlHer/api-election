const express = require('express');
const router = express.Router();
const routerVote = require('../controllers/vote');

router.post('/', routerVote.createVote);
router.get('/statistics', routerVote.getStatistics);

module.exports = router;