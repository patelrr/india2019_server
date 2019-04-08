const express = require('express');

const router = express.Router();

const partyCtrl = require('../controller/party');

router.route('/')
    .get(partyCtrl.getAllParty);

module.exports = router;