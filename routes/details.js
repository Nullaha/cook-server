var express = require('express');
var fs = require('fs')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('data/recipes.json', (err, data) => {
        if (err) throw err;
        console.log(req.query.id);
        const obj = JSON.parse(data).filter(item=>{
            return item.uuid == req.query.id
        })
        console.log(obj);      
        res.send(obj)

      });
});

module.exports = router;