const express = require('express');
const router = express.Router();
const test = require('../controllers/testController')


/* GET test page. */
router.get('/',test.getUser );

module.exports = router;
