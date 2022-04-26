const mysql = require('mysql')
module.exports ={
    //数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'cook'
    }, 
    //连接数据库，使用mysql的连接池连接方式
    //连接池对象
    sqlConnect:function(sql,sqlArr,callback){
        const pool=mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log('12345');
            if(err){
                console.log(err);
                console.log('连接失败');
                return
            }
            //事件驱动配置
            conn.query(sql,sqlArr,callback)
            //释放连接
            conn.release()
        })
    },

    //promise回调
    sySqlConnect:function(sySql,sqlArr){
        return new Promise((resolve,reject)=>{
            const pool = mysql.createPool(this.config)
            pool.getConnection((err,conn)=>{
                if(err){
                    reject(err)
                }else{

                    //事件驱动配置
                    conn.query(sySql,sqlArr,(err,data)=>{
                        if(err){
                            reject(err)
                        }else{
    
                            resolve(data)
                        }
                    })
                    //释放连接
                    conn.release()
                }
            })
        }).catch((err)=>{
            console.log(err);
        })
    },
}