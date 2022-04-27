public：静态文件。用来存放项目静态文件目录如js,css以及图片。
routes：路由文件。路由主要定义 url 和 资源 的映射关系 ( 一一对应关系 ),
主要用来接收前端发送的请求 响应数据给前端
views：后端模版文件。
app.js：入口文件。
package.json：工程信息和模块依赖。


                             GET参数           POST参数
✅GET   /recipe                  无
✅GET   /recipe/details          id
❌POST  /recipe/uploadFile                      uuid file

✅POST  /user/login                                account pwd
❌POST  /user/exit                                 account pwd
❌POST  /user/forgetPwd                            account pwd
❌POST  /user/changePwd                            account oldPwd newPwd
❌GET   /user/getInfo           
❌POST   /user/updateInfo           







+ 参考：
    + 接口加token  https://segmentfault.com/a/1190000039069150
                    https://juejin.cn/post/6844903941851840519
    + 接口文档     https://apidocjs.com/#param-api-param-example
                  https://www.showdoc.com.cn/petSystem/2087346087442875

    + 连mysql     https://gitee.com/min_hacker/learn/blob/master/controllers/follow_controller.js
    + node全栈    https://juejin.cn/post/6894065644933906445
                    https://juejin.cn/post/6888577960409268232
    + mysql
        + 多对多  https://www.modb.pro/db/324117
        + array https://zditect.com/main-advanced/database/json_arrayagg-create-a-json-array-from-the-row

+ api接口
    + 用户模块的接口
        + 用户表： id account name pwd role  create_time
    + 菜
        +菜谱表：id uuid name tools method photo account? author?
        +食材表：id name







+ 问题
    1. 函数中的promise，我怎么接收返回值
// Promise 中处理的是异步调用，异步调用是非阻塞式的，在调用的时候并不知道它什么时候结束，也就不会等到他返回一个有效数据之后再进行下一步处理
// 可以使用 async 和 await来得到我们的返回值






