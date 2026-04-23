var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).json({
        message : "DocPulse API is up and running!"
    })
//  res.render('index', { title: 'Express' });
});

module.exports = router;