var express = require('express');
var router = express.Router();
const document = require('../controller/docPulseController');

router.post('/create',document.insertDocument);
router.get('/:product/getbytags/:tags',document.getByTags);
router.get('/:product/getbydays/:days',document.getBydays);
router.get('/getlastcommitid/:source_name',document.getLastCommitIdBySourceName);
router.get('/:product/getbydaterange/:startDate/:endDate', document.getByDateRange);

module.exports = router;