const express = require('express');
const router = express.Router();
const routerVote = require('../controllers/vote');
const checkAuth = require('../middleware/auth.js')

router.post('/',checkAuth.auth, routerVote.createVote);
router.post('/auth', routerVote.generateTkVoter);
router.get('/statistics', routerVote.getStatistics);


module.exports = router;