const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')


// const loginRouter = require('./routes/login')
const recipeRouter = require('../routes/recipe')
const userRouter = require('../routes/user');
const testRouter = require('../routes/test')

const vertoken = require('../util/token');
// const expressJWT = require('express-jwt');
const { expressjwt: jwt } = require("express-jwt");

const app = express();
const http = require('http');
const server = http.createServer(app);
app.set('data',path.join(__dirname,'data'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*")
    next()
})


// app.use('/login',loginRouter)
app.use('/recipe',recipeRouter);
app.use('/user', userRouter);
app.use('/test',testRouter)

//token
app.use(function (req, res, next) {
  const token = req.headers['authorization'];
  if (token == undefined) {
    return next();
  } else {
    vertoken.verToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
  next(createError(404));
})

app.use(jwt({
  secret: 'mes_qdhd_mobile_xhykjyxgs',
  algorithms: ["HS256"]
}).unless({
  path: ['/login','/test','recipe']//除了这个地址，其他的URL都需要验证
}))






// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   if (err.status == 401) {
//     return res.status(401).send('token失效');
//   }
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

server.listen('3002',()=>{
  console.log('aaaa');
})
