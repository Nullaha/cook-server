const dbConfig = require('../util/dbconfig')
//获取用户
getUser=(req,res)=>{
    const sql ="select * from user"
  const sqlArr = []
  const callback =(err,data)=>{
    if(err){
      console.log('出错了');
    }else{
        console.log(data);
      res.send({
        'list':data
      })
    }

  }
  dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports = {
    getUser
}