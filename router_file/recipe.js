const express = require('express');
const fs = require('fs')
const router = express.Router();

/* GET user listing. */
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

/* GET user listing. */
router.get('/details', function(req, res, next) {
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