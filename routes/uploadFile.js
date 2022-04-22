var express = require('express');
var fs = require('fs')
var router = express.Router();
const multer  = require('multer')
const upload = multer()

/* POST users listing. */
router.post('/',upload.array('photos', 12), function(req, res, next) {
    console.log(req.files)
    console.log(req.body);
    res.send('成功了')
});

module.exports = router;