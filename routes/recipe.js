const express = require('express');
const fs = require('fs')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('data/recipes.json', (err, data) => {
        if (err) throw err;
        // console.log(JSON.parse(data))
        const obj = []
        JSON.parse(data).forEach(element => {
            obj.push({
                uuid:element.uuid,
                name:element.name,
                stuff:element.stuff,
            })
        });      
        res.send(obj)

      });
//   res.send('hello ');
});

module.exports = router;