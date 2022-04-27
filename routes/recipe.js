const express = require('express');
const router = express.Router();
const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');


const Recipe = require('../controllers/recipeController')


/**
 * @api {get} /recipe 获取所有菜谱
 * @apiDescription 获取所有菜谱
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success" : true,
 *      "msg":"成功",
 *      "token":data
 * }
*/
router.get('/',Recipe.getAllRecipes);


/**
 * @api {get} /recipe/details 获取某个菜谱的详情
 * @apiDescription 获取某个菜谱的详情
 * @apiQuery  {String} uuid 菜谱的uuid
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success" : true,
 *      "msg":"登成功",
 *      "token":data
 * }
 */
router.get('/details', Recipe.getRecipeDetails);


// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');    // 保存的路径，备注：需要自己创建
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

// /upload.array('photos', 1)
/**
 * @api {post} /recipe/uploadFile 上传菜谱
 * @apiDescription 上传菜谱
 * @apiBody  {String} name 菜名
 * @apiBody  {String} stuff 食材
 * @apiBody  {String} tools 工具
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success" : true,
 *      "msg":"成功"
 * }
 */
router.post('/uploadFile',upload.single('photo'), Recipe.upload);

module.exports = router;