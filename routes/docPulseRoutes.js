var express = require('express');
var router = express.Router();
const document = require('../controller/docPulseController');

router.post('/create',document.insertDocument);

module.exports = router;