const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const dbConfig = require('../util/dbconfig')

//获取所有菜谱
getAllRecipes = (req,res)=>{
    const sql = 'select * from recipe'
    const sqlArr =[]
    dbConfig.sySqlConnect(sql,sqlArr)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send({success:false,msg:'失败了'})
    })    
}

// 获取某个菜谱的详情
getRecipeDetails = (req,res)=>{
    const sql = 'select * from recipe where uuid=?'
    const sqlArr =[req.query.uuid]
    dbConfig.sySqlConnect(sql,sqlArr)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send({success:false,msg:'失败了'})
    })
}

//上传菜谱 todo
upload = (req,res)=>{
    const sql ='insert into recipe follow (uuid,name,stuff,tools) values(?,?,?,?)'
    const sqlArr=[uuidv4(),req.body.name,req.body.stuff,req.body.tools]
    dbConfig.sySqlConnect(sql,sqlArr)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send({success:false,msg:'失败了'})
    })
}


module.exports = {
    getAllRecipes,
    getRecipeDetails,
    upload,
}