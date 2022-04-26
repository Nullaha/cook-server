const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs')
const router = express.Router();
const multer  = require('multer')
const upload = multer()
const { v4: uuidv4 } = require('uuid');

const jwt = require('jsonwebtoken');
const Ctoken = require('../public/token');

/* POST users listing. */
router.post('/',upload.none(), function(req, res, next) {
    //1 获取表单数据
    //2 处理数据 (验证user.json中是否有这个账号，有就创建token给客户端，没有就false)
    //3 发送响应,返回个token给客户端
    //先读取出来，转成对象
    //然后往对象中push
    //然后把对象转为字符串
    //把字符串再次写入文件中
    let obj = {}
    console.log(req.body);
    fs.readFile('data/user.json', (err, data) => {
        if (err) throw err;
        // console.log(JSON.parse(data))
        const flag = JSON.parse(data).some(element => {
            return element.name == req.body.name && element.pwd == req.body.pwd
        });   
        if(!flag){
            res.send({
                code:false,
                msg:'账号密码错误'
            })
        }
        Ctoken.setToken(req.body.name).then(data=>{
            obj = {
                code:true,
                msg:'',
                token:data,
            }
            res.send(obj)
        })
        
      });
    
});

module.exports = router;