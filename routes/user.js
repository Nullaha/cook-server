const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()

const { v4: uuidv4 } = require('uuid');

const jwt = require('jsonwebtoken');
const Ctoken = require('../util/token');

const User = require('../controllers/userController')

/**
 * @api {get} /user/getInfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiQuery  {String} token token
 */
router.get('/getInfo',User.getUserInfo)


/**
 * @api {post} /user/updateInfo 修改用户信息
 * @apiDescription 修改用户信息
 * @apiBody  {String} data data
 */
 router.post('/updateInfo',User.updateInfo)

/**
 * @api {post} /user/login 登录
 * @apiDescription 登录
 * @apiBody  {String} account 账号
 * @apiBody  {String} pwd 密码
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success" : true,
 *      "msg":"登录成功",
 *      "token":token,
 *      "content":data
 * }
 */
router.post('/login',upload.none(), User.login);


/**
 * @api {post} /user/exit 退出
 * @apiDescription 退出
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success" : true,
 *      "msg":"退出登陆成功"
 * }
 */
router.post('/exit',upload.none(), User.exit);


/**
 * @api {post} /user/forgetPwd 忘记密码
 * @apiDescription 忘记密码
 * @apiBody  {String} account 账号
 * @apiBody  {String} pwd 新密码
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success" : true,
 *      "msg":"修改成功"
 * }
 */
router.post('/forgetPwd',upload.none(),User.forgetPwd)

/**
 * @api {post} /user/changePwd 修改密码
 * @apiDescription 修改密码
 * @apiBody  {String} account 账号
 * @apiBody  {String} oldPwd 旧密码
 * @apiBody  {String} newPwd 新密码
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success" : true,
 *      "msg":"修改成功"
 * }
 */
 router.post('/changePwd',upload.none(),User.changePwd)

module.exports = router;
