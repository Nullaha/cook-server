const dbConfig = require('../util/dbconfig')

// 根据acount查表验证是否注册

    // Promise 中处理的是异步调用，异步调用是非阻塞式的，在调用的时候并不知道它什么时候结束，也就不会等到他返回一个有效数据之后再进行下一步处理
    // 可以使用 async 和 await来得到我们的返回值
    // const isRegistration =async(account)=>{
    //     const sySql = 'select * from user where account=?'
    //     const sqlArr =[account]
    //     const res = await dbConfig.sySqlConnect(sySql,sqlArr)
    //     console.log(res);
    //     if(res.length){
    //         return true
    //     }else{
    //         return false
    //     }
    // }
const isRegistration =(account)=>{
    const sySql = 'select * from user where account=?'
    const sqlArr =[account]
    return dbConfig.sySqlConnect(sySql,sqlArr)
}

//判断密码是否正确
const isPwd = (account,pwd)=>{
    const sySql = 'select * from user where account=? and pwd=?'
    const sqlArr =[account,pwd]
    return dbConfig.sySqlConnect(sySql,sqlArr)
}


//登录
login= (req,res)=>{
    //用account查表,如果没有值提示未注册
    //              如果有值 验证用户名和密码是否一致
    console.log(req.body);
    isRegistration(req.body.account).then(data=>{
        console.log(data);
        if(!data.length){
            res.send('未注册')
        }else{
            return res
        }
    }).then(res=>{
        isPwd(req.body.account,req.body.pwd).then(data=>{
            console.log('ispwd');
            if(!data.length){
                res.send('密码不正确')
            }else{
                res.send(data)
            }
        })
    })
    

}







module.exports = {
    login,
}