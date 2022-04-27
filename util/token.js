//用于生成和解析token
const jwt = require('jsonwebtoken')
// const signkey = 'mes_qdhd_mobile_xhykjyxgs';
const signkey = 'rootAndShaw';
// jsonwebtoken是用来生成token给客户端的,express-jwt是用来验证token的。



exports.setToken = function(username,userid){
    return new Promise((resolve,reject)=>{
        const token = jwt.sign({
            name:username,
        },signkey,{expiresIn:'1h'})
        resolve(token)
    })
}

exports.verToken = function(token){
    return new Promise((resolve,reject)=>{
        const info = jwt.verify(token.split(' ')[1],signkey)
        resolve(info)
    })
}

