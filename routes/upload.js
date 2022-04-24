var express = require('express');
const bodyParser = require('body-parser')
var fs = require('fs')
var router = express.Router();
const multer  = require('multer')
const upload = multer()
const { v4: uuidv4 } = require('uuid');

/* POST users listing. */
router.post('/',upload.none(), function(req, res, next) {
    //1 获取表单数据
    //2 处理数据
    //3 发送响应
    //先读取出来，转成对象
    //然后往对象中push
    //然后把对象转为字符串
    //把字符串再次写入文件中
    const obj = []
    console.log(req.body);
    fs.readFile('data/recipes.json', (err, data) => {
        if (err) throw err;
        // console.log(JSON.parse(data))
        JSON.parse(data).forEach(element => {
            obj.push({
                uuid:element.uuid,
                name:element.name,
                stuff:element.stuff,
                tools:element.tools,
            })
        });   
        obj.push({
            uuid:uuidv4(),
            name:req.body.name,
            stuff:req.body.stuff,
            tools:req.body.tools
        })
        fs.writeFile('data/recipes.json',JSON.stringify(obj),(err)=>{
            if(err){
                console.log('写入失败');
            }else{
                console.log('写入成功');
            }
        })
        res.send('成功了')
      });
    
});

module.exports = router;