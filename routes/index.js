const express = require('express');
const partyRoutes = require('./party');

const router = express.Router();

router.use('/party', partyRoutes);

module.exports = router;