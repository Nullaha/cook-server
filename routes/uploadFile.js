const express = require('express');
const fs = require('fs')
const router = express.Router();
const multer  = require('multer')

const { v4: uuidv4 } = require('uuid');

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/img/');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        file.uuid = uuidv4()
        console.log('aaaaaaaaaaaaaaaaaaaaaaa')
        console.log(file);
        cb(null, `${file.uuid}.${file.mimetype.split('/')[1]}`);  
    }
});

const upload = multer({storage:storage})  //自定义本地保存的路径

/* POST users listing. */      //upload.array('photos', 1)
router.post('/',upload.single('photo'), function(req, res, next) {
    // 既有文件，又有其他字段
    //文件以uuid命名存储到img文件中，将uuid存到json中。
    console.log('------------------');
    console.log(req);
    console.log('--------------------------------');
    console.log(req.file)
    console.log(req.body);

    const obj = []
    fs.readFile('data/recipes.json', (err, data) => {
        if (err) throw err;
        // console.log(data)
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
            uuid:req.files?req.files[0].uuid:uuidv4(),
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