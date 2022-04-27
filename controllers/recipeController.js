const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const dbConfig = require('../util/dbconfig')

//获取所有菜谱
getAllRecipes = (req,res)=>{
    // const sql = 'select * from recipe'
    const sql = `select
                    recipe.id,recipe.uuid,recipe.name,recipe.tools,recipe.method,recipe.photo, 
                    json_arrayagg(food.name) as foods
                from recipe
                left join recipe_link_food
                on recipe.id = recipe_link_food.recipe_id
                left join food
                on recipe_link_food.food_id = food.id
                group by recipe.id`
    const sqlArr =[]
    dbConfig.sySqlConnect(sql,sqlArr)
    .then(data=>{
        res.send({
            success:true,
            msg:'成功',
            content:data
        })
    })
    .catch(err=>{
        res.send({success:false,msg:'失败了'})
    })    
}

// 获取某个菜谱的详情
getRecipeDetails = (req,res)=>{
    // const sql ='select * from recipe where uuid=?'
    const sql = `select 
                    recipe.id,recipe.uuid,recipe.name,recipe.tools,recipe.method,recipe.photo, 
                    json_arrayagg(food.name) as foods
                    from recipe 
                    left join recipe_link_food
                    on recipe.id = recipe_link_food.recipe_id
                    left join food
                    on recipe_link_food.recipe_id=food.id
                    where uuid=?`
    const sqlArr =[req.query.uuid]
    dbConfig.sySqlConnect(sql,sqlArr)
    .then(data=>{
        res.send({
            success:true,
            msg:'成功',
            content:data
        })
    })
    .catch(err=>{
        res.send({success:false,msg:'失败了'})
    })
}

//上传菜谱 todo
upload = (req,res)=>{
    console.log(req.body);
    // const sql ='insert into recipe (uuid,name,stuff,tools) values(?,?,?,?)'
    const recipe_uuid = uuidv4()
    let sql =`insert into recipe (uuid,recipe.name,tools,method) values(?,?,?,?);`
    let sqlArr=[
        recipe_uuid,
        req.body.name,
        req.body.tools,
        req.body.method]
    
    req.body.foods.forEach(food => {
        sql+=`INSERT INTO food (food.name) VALUES (?);`
        sqlArr.push(food)
    });
    console.log(sql);
    console.log(sqlArr);
    dbConfig.sySqlConnect(sql,sqlArr)
    .then(data=>{
        // 如果写入菜谱表成功，现在写入食材表(食材唯一)
        // console.log(recipe_uuid);
        // const recipe_id = data.insertId
        // const food_sql = ``
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